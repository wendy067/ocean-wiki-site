-- 1. DDL - CRIAÇÃO DO BANCO E TABELAS
DROP DATABASE IF EXISTS mare_de_conhecimento;

CREATE DATABASE mare_de_conhecimento
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE mare_de_conhecimento;

CREATE TABLE grupos_marinhos (
  id_grupo INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(30) NOT NULL UNIQUE,
  nome_grupo VARCHAR(60) NOT NULL
);

CREATE TABLE especies (
  id_especie INT AUTO_INCREMENT PRIMARY KEY,
  nome_popular VARCHAR(100) NOT NULL,
  nome_cientifico VARCHAR(120) NOT NULL UNIQUE,
  descricao TEXT NOT NULL,
  habitat VARCHAR(200) NOT NULL,
  dieta VARCHAR(150) NOT NULL,
  risco_extincao ENUM('BAIXO', 'MODERADO', 'AMEACADO') DEFAULT 'BAIXO',
  id_grupo INT NOT NULL,
  CONSTRAINT fk_especie_grupo
    FOREIGN KEY (id_grupo) REFERENCES grupos_marinhos(id_grupo)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

CREATE TABLE apoiadores_clube (
  id_apoiador INT AUTO_INCREMENT PRIMARY KEY,
  nome_completo VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  cpf VARCHAR(14) UNIQUE,
  telefone VARCHAR(20),
  valor_mensal DECIMAL(8, 2) NOT NULL DEFAULT 25.00,
  aceitou_novidades BOOLEAN NOT NULL DEFAULT TRUE,
  data_inscricao DATETIME DEFAULT NOW(),
  CONSTRAINT chk_valor_positivo CHECK (valor_mensal >= 0)
);

CREATE INDEX idx_nome_popular ON especies(nome_popular);

CREATE OR REPLACE VIEW vw_catalogo_completo AS
SELECT 
  e.id_especie,
  e.nome_popular,
  e.nome_cientifico,
  g.nome_grupo AS categoria,
  e.habitat,
  e.dieta,
  e.risco_extincao
FROM especies e
JOIN grupos_marinhos g ON e.id_grupo = g.id_grupo;


-- 2. DML - INSERÇÃO, ATUALIZAÇÃO E EXCLUSÃO
INSERT INTO grupos_marinhos (slug, nome_grupo) VALUES
  ('mamiferos', 'Mamíferos'),
  ('peixes', 'Peixes'),
  ('repteis', 'Répteis'),
  ('invertebrados', 'Invertebrados'),
  ('aves', 'Aves marinhas');

INSERT INTO especies (nome_popular, nome_cientifico, descricao, habitat, dieta, risco_extincao, id_grupo) VALUES
  ('Baleia-azul', 'Balaenoptera musculus', 'Maior animal conhecido do planeta.', 'Oceanos de todo o mundo.', 'Principalmente krill.', 'AMEACADO', 1),
  ('Tubarão-baleia', 'Rhincodon typus', 'Maior peixe do mundo, alimenta-se por filtração.', 'Águas tropicais e subtropicais.', 'Plâncton e pequenos peixes.', 'AMEACADO', 2),
  ('Tartaruga-de-pente', 'Eretmochelys imbricata', 'Bico estreito para alcançar frestas de recifes.', 'Recifes tropicais e praias de desova.', 'Esponjas e invertebrados.', 'AMEACADO', 3),
  ('Polvo-comum', 'Octopus vulgaris', 'Tem oito braços e muda de cor e textura.', 'Recifes e fundos rochosos.', 'Crustáceos e moluscos.', 'BAIXO', 4),
  ('Pinguim-imperador', 'Aptenodytes forsteri', 'Maior espécie de pinguim, suporta o frio antártico.', 'Gelo e águas costeiras da Antártida.', 'Peixes, krill e lulas.', 'MODERADO', 5);

INSERT INTO apoiadores_clube (nome_completo, email, cpf, telefone, valor_mensal) VALUES
  ('Marina Silva Costa', 'marina.costa@email.com', '123.456.789-00', '(19) 99999-1111', 50.00),
  ('Lucas Oliveira', 'lucas.oliveira@email.com', NULL, '(19) 98888-2222', 25.00),
  ('Beatriz Santos', 'bia.santos@email.com', '987.654.321-11', NULL, 100.00);

UPDATE apoiadores_clube
SET valor_mensal = 75.00
WHERE email = 'marina.costa@email.com';

DELETE FROM apoiadores_clube
WHERE id_apoiador = 2;


-- 3. DQL - CONSULTAS E RELATÓRIOS
SELECT * FROM vw_catalogo_completo;

SELECT nome_popular, nome_cientifico, dieta
FROM especies
WHERE risco_extincao = 'AMEACADO' AND id_grupo IN (1, 2, 3)
ORDER BY nome_popular ASC;

SELECT 
  g.nome_grupo,
  COUNT(e.id_especie) AS total_especies
FROM grupos_marinhos g
LEFT JOIN especies e ON g.id_grupo = e.id_grupo
GROUP BY g.id_grupo, g.nome_grupo
HAVING COUNT(e.id_especie) >= 1
ORDER BY total_especies DESC;

SELECT 
  COUNT(*) AS total_apoiadores,
  AVG(valor_mensal) AS media_doacao,
  MAX(valor_mensal) AS maior_doacao,
  MIN(valor_mensal) AS menor_doacao,
  SUM(valor_mensal * 12) AS projecao_anual_total
FROM apoiadores_clube;

SELECT nome_completo, email, valor_mensal
FROM apoiadores_clube
WHERE valor_mensal > (SELECT AVG(valor_mensal) FROM apoiadores_clube);


-- 4. DTL/TCL - CONTROLE DE TRANSAÇÕES
START TRANSACTION;

  INSERT INTO apoiadores_clube (nome_completo, email, valor_mensal)
  VALUES ('Carlos Eduardo', 'carlos.edu@email.com', 40.00);

  SET @ultimo_apoiador = LAST_INSERT_ID();
  SAVEPOINT antes_do_ajuste;

  UPDATE apoiadores_clube SET valor_mensal = 999.00 WHERE id_apoiador = @ultimo_apoiador;
  ROLLBACK TO SAVEPOINT antes_do_ajuste;

COMMIT;


-- 5. DCL - ADMINISTRAÇÃO E ACESSOS
CREATE USER IF NOT EXISTS 'app_mare'@'localhost' IDENTIFIED BY 'SenhaSegura@2026';

GRANT SELECT ON mare_de_conhecimento.especies TO 'app_mare'@'localhost';
GRANT SELECT, INSERT ON mare_de_conhecimento.apoiadores_clube TO 'app_mare'@'localhost';

SHOW GRANTS FOR 'app_mare'@'localhost';


-- 6. ALTERAÇÃO DE TABELA
ALTER TABLE especies
ADD COLUMN bioma VARCHAR(80) DEFAULT 'Marinho' AFTER habitat;

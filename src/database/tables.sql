CREATE TABLE exposicao(
    id_exposicao INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descricao VARCHAR(250),
    data_inicio DATE NOT NULL,
    data_fim_previsto DATE NOT NULL,
    data_fim_real DATE,
    status VARCHAR(15) NOT NULL
);

CREATE TABLE visitante(
    id_visitante INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    data_cadastro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    quant_visitas INT
);

CREATE TABLE agendamento(
    id_agendamento INT AUTO_INCREMENT PRIMARY KEY,
    id_visitante INT NOT NULL,
    id_exposicao INT NOT NULL,
    data_agendada DATE NOT NULL,
    hora_agendada TIME NOT NULL,
    status_agendamento VARCHAR(50),
    FOREIGN KEY (id_visitante) REFERENCES visitante(id_visitante),
    FOREIGN KEY (id_exposicao) REFERENCES exposicao(id_exposicao)
);

CREATE TABLE sala(
    num_sala INT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(200),
    capacidade INT NOT NULL
);

CREATE TABLE partitura(
    id_partitura INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    autor VARCHAR(100) NOT NULL,
    ano INT NOT NULL,
    link_musica VARCHAR(255),
    arquivo_partitura VARCHAR(255)
);

CREATE TABLE tipo_instrumento(
    id_tipo INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE evento(
    id_evento INT AUTO_INCREMENT PRIMARY KEY,
    nome_evento VARCHAR(100) NOT NULL,
    email_contato VARCHAR(150) NOT NULL,
    telefone_contato VARCHAR(20),
    local VARCHAR(150) NOT NULL,
    data_inicio DATE NOT NULL,
    data_fim_previsto DATE NOT NULL,
    data_fim_real DATE
);

CREATE TABLE historico (
    id_historico INT AUTO_INCREMENT PRIMARY KEY,
    id_agendamento INT NOT NULL UNIQUE,
    data_visita DATE,
    status VARCHAR(50),
    FOREIGN KEY (id_agendamento)
        REFERENCES agendamento(id_agendamento)
);

CREATE TABLE instrumento (
    id_instrumento INT AUTO_INCREMENT PRIMARY KEY,
    id_tipo INT NOT NULL,
    nome VARCHAR(255) NOT NULL,
    ano_fabricacao INT,
    antigo_dono VARCHAR(255),
    link_som VARCHAR(255),
    FOREIGN KEY (id_tipo)
        REFERENCES tipo_instrumento(id_tipo)
);

INSERT INTO tb_user (first_name, last_name, email, password) VALUES ('Alex', 'Brown', 'alex@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG');
INSERT INTO tb_user (first_name, last_name, email, password) VALUES ('Maria', 'Green', 'maria@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG');

INSERT INTO tb_role (authority) VALUES ('ROLE_OPERATOR');
INSERT INTO tb_role (authority) VALUES ('ROLE_ADMIN');

INSERT INTO tb_user_role (user_id, role_id) VALUES (1, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2, 2);

INSERT INTO tb_client (name, phone) VALUES ('Matheus Felipe Jesus Rocha Gois', '(75) 99985-5427');
INSERT INTO tb_client (name, phone) VALUES ('Valdice Querem', '(75) 99999-5967');
INSERT INTO tb_client (name, phone) VALUES ('Bidu', '(75) 96855-5697');

INSERT INTO tb_scheduled (date, price, value_paid, status, client_id) VALUES ('2021-01-05', 500.00, 500.00, 'Concluido', 1);
INSERT INTO tb_scheduled (date, price, value_paid, status, client_id) VALUES ('2021-01-14', 500.00, 250.00, 'Aguardando', 2);
INSERT INTO tb_scheduled (date, price, value_paid, status, client_id) VALUES ('2021-01-20', 500.00, 250.00, 'Aguardando', 3);
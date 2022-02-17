--
-- PostgreSQL database cluster dump
--

-- Started on 2022-02-17 16:07:46

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.0 (Debian 14.0-1.pgdg110+1)
-- Dumped by pg_dump version 14.1

-- Started on 2022-02-17 16:07:46

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Completed on 2022-02-17 16:07:46

--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

\connect postgres

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.0 (Debian 14.0-1.pgdg110+1)
-- Dumped by pg_dump version 14.1

-- Started on 2022-02-17 16:07:46

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Completed on 2022-02-17 16:07:46

--
-- PostgreSQL database dump complete
--

--
-- Database "surge" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.0 (Debian 14.0-1.pgdg110+1)
-- Dumped by pg_dump version 14.1

-- Started on 2022-02-17 16:07:46

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3326 (class 1262 OID 16384)
-- Name: surge; Type: DATABASE; Schema: -; Owner: charukahs
--

CREATE DATABASE surge WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE surge OWNER TO charukahs;

\connect surge

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3319 (class 0 OID 16387)
-- Dependencies: 211
-- Data for Name: data; Type: TABLE DATA; Schema: users; Owner: charukahs
--

INSERT INTO users.data (id, full_name, username, pwd, email, created_at) OVERRIDING SYSTEM VALUE VALUES (8, 'Joe Mama', 'joemama2', '$2b$10$pp5qld4hKulSqqHGIXxl4eFc3wyC1VLFLzKxSiqUO/mk1cFnKGZg2', 'joe2@mama.com', '2022-02-15 23:28:19.64935+00');
INSERT INTO users.data (id, full_name, username, pwd, email, created_at) OVERRIDING SYSTEM VALUE VALUES (10, 'joe mama', 'joemama3', '$2b$10$kPERpvG0x.N1UN/o6166/ulXkDC8qAdDMYSBYiOGwYoZ.pfHkahfW', 'joe@mama.com', '2022-02-16 08:46:37.373335+00');
INSERT INTO users.data (id, full_name, username, pwd, email, created_at) OVERRIDING SYSTEM VALUE VALUES (13, 'joe mama', 'joemama4', '$2b$10$ZLE8izRwhJnWhyxStYY.YOqJh9eG.7ctD/BP56vjKMTgJrh48A2x.', 'joe@mama.com', '2022-02-16 08:54:13.366137+00');
INSERT INTO users.data (id, full_name, username, pwd, email, created_at) OVERRIDING SYSTEM VALUE VALUES (15, 'Charuka HS', 'chxru', '$2b$10$zqvUwphAsIzeIoqEPcbu4.xhh9I4JBdK.e9qPE1RDYaTJiSgdoze.', 'charuka@email.com', '2022-02-16 10:23:10.312659+00');
INSERT INTO users.data (id, full_name, username, pwd, email, created_at) OVERRIDING SYSTEM VALUE VALUES (16, 'Charuka HS', 'chxru1', '$2b$10$pHu8alojOwFpsCYcuf/hOOjfAr.fDcK4ZetvVFxn13phOBnOR8wzq', 'charuka@email.com', '2022-02-16 10:24:58.818354+00');
INSERT INTO users.data (id, full_name, username, pwd, email, created_at) OVERRIDING SYSTEM VALUE VALUES (17, 'Charuka HS', 'chxru2', '$2b$10$nB3DQjU3i.M79zOnRvKtgerqNSOiQbE9vqarBQeV0R6deWUO2LdG.', 'charuka@email.com', '2022-02-16 10:31:22.283719+00');
INSERT INTO users.data (id, full_name, username, pwd, email, created_at) OVERRIDING SYSTEM VALUE VALUES (18, 'joe mama', 'joemama5', '$2b$10$o.qeJSJoJ0Y.iBxGkN3evePYvOlI3NheYxW/VfQpeiUEQ4ZkDz9am', 'joe@mama.com', '2022-02-16 10:31:40.204866+00');
INSERT INTO users.data (id, full_name, username, pwd, email, created_at) OVERRIDING SYSTEM VALUE VALUES (19, 'Charuka HS', 'chxru3', '$2b$10$T4m4PNAVv8Ga5vLCkgfZU.9ianW0eYQAn8fEIA3tDMGNlb4ukOiTq', 'charuka@email.com', '2022-02-16 10:35:13.941087+00');
INSERT INTO users.data (id, full_name, username, pwd, email, created_at) OVERRIDING SYSTEM VALUE VALUES (20, 'Charuka HS', 'chxru32', '$2b$10$Uxt1ZvPiqz5uTmfkpQ.nU.Gky77f1PnFlZ3Jnzu/0cNyWflmIkuWK', 'charuka@email.com', '2022-02-16 10:44:18.659208+00');
INSERT INTO users.data (id, full_name, username, pwd, email, created_at) OVERRIDING SYSTEM VALUE VALUES (21, 'Joe Mama', 'joemama42', '$2b$10$SiOljyaCZdK3ash9L0.OQ.IPS/HTQDL0XGfyp94UiUss53n5DaG/6', 'joe2@mama.com', '2022-02-16 11:32:55.919566+00');
INSERT INTO users.data (id, full_name, username, pwd, email, created_at) OVERRIDING SYSTEM VALUE VALUES (22, 'Charuka HS', 'chxru32a', '$2b$10$2PoPFfj0Bw5BnOwu75ugL.4LDMINjYUHt0jJsMHyeWju/Z1w0Zh1S', 'charuka@email.com', '2022-02-16 12:18:51.277665+00');
INSERT INTO users.data (id, full_name, username, pwd, email, created_at) OVERRIDING SYSTEM VALUE VALUES (1, 'Joe Mamaaaaa', 'joemama', '$2b$10$mu2G99OLfQOkzQYpao/pL.6yMhN.LJLCZt8oe8nxZincgEfeu.m.i', 'joe@mama.com', '2022-02-15 23:18:41.885757+00');
INSERT INTO users.data (id, full_name, username, pwd, email, created_at) OVERRIDING SYSTEM VALUE VALUES (23, 'charuka heee', 'charuka', '$2b$10$ynulriGOZ5thEj8LEmkUzOc3f6b98kLd4xIq2asvg.JQpZoNSuxuu', 'qwe@asd.com', '2022-02-16 22:57:19.529302+00');


--
-- TOC entry 3320 (class 0 OID 16398)
-- Dependencies: 212
-- Data for Name: tokens; Type: TABLE DATA; Schema: users; Owner: charukahs
--

INSERT INTO users.tokens (id, token, expires) VALUES (8, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNjQ0OTY3NzAwLCJleHAiOjE2NDU1NzI1MDB9.pBsGi0S6ZXca4VsS6ufUgKNcfKoyG1CAJGyns2KOpI0', '2022-02-16 05:18:20.104');
INSERT INTO users.tokens (id, token, expires) VALUES (10, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTY0NTAwMTE5NywiZXhwIjoxNjQ1NjA1OTk3fQ.yEArZdu1EcXeusH1GaYpqFbiVJdt-VMLLHa2NRv8agU', '2022-02-16 14:36:37.552');
INSERT INTO users.tokens (id, token, expires) VALUES (13, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTY0NTAwMTY1MywiZXhwIjoxNjQ1NjA2NDUzfQ.uhgn8L2jMSL8OCM50D4U67zLYt8KhmxL06CXeUNwUqU', '2022-02-16 14:44:13.541');
INSERT INTO users.tokens (id, token, expires) VALUES (15, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImlhdCI6MTY0NTAwNjk5MCwiZXhwIjoxNjQ1NjExNzkwfQ.4cq7O4ySvUDZyTjmq3c3dCPVaCQwc4fZNxY3Ak4W_C8', '2022-02-16 16:13:10.504');
INSERT INTO users.tokens (id, token, expires) VALUES (16, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsImlhdCI6MTY0NTAwNzA5OCwiZXhwIjoxNjQ1NjExODk4fQ.RSbuew3mu6BIIDf0KzJ9psiOjcuXsKNEvaKWo9wRsEg', '2022-02-16 16:14:58.996');
INSERT INTO users.tokens (id, token, expires) VALUES (17, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsImlhdCI6MTY0NTAwNzQ4MiwiZXhwIjoxNjQ1NjEyMjgyfQ.LEKTX3piYuEfo9piSRPoZ2Y7PbxUATi4kINxTzJ7J2U', '2022-02-16 16:21:22.462');
INSERT INTO users.tokens (id, token, expires) VALUES (18, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgsImlhdCI6MTY0NTAwNzUwMCwiZXhwIjoxNjQ1NjEyMzAwfQ.vuCWjX9n2RO4CxC_7mfvAWBTBeAMx6HrqRWkMgVnmLg', '2022-02-16 16:21:40.38');
INSERT INTO users.tokens (id, token, expires) VALUES (19, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksImlhdCI6MTY0NTAwNzcxNCwiZXhwIjoxNjQ1NjEyNTE0fQ.c6TZPbaFLxyiXjIDbLQ3NHCIllWijUyu9qllygMvLy8', '2022-02-16 16:25:14.118');
INSERT INTO users.tokens (id, token, expires) VALUES (20, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImlhdCI6MTY0NTAwODI1OCwiZXhwIjoxNjQ1NjEzMDU4fQ.XcHDIDo5NBWQeQuMRBl9eaezK7fZU8QSvEFPqDxnqRw', '2022-02-16 16:34:18.836');
INSERT INTO users.tokens (id, token, expires) VALUES (21, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsImlhdCI6MTY0NTAxMTE3NiwiZXhwIjoxNjQ1NjE1OTc2fQ.MH0JCSCXWx60knNgKpNuv1YOK6XbQbZ7XEiqNGLxNWA', '2022-02-16 17:22:56.1');
INSERT INTO users.tokens (id, token, expires) VALUES (1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ1MDExMjg1LCJleHAiOjE2NDU2MTYwODV9.CnlQ0wP35mj9EGoqeksFZoGw6h7s9RKBSgA9AfsFUQA', '2022-02-16 17:24:45.266');
INSERT INTO users.tokens (id, token, expires) VALUES (1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ1MDExMzA1LCJleHAiOjE2NDU2MTYxMDV9.6cwOocoH-lcNUpAQhlKoGz7a4eRtDHA70Ll6R09WetU', '2022-02-16 17:25:05.804');
INSERT INTO users.tokens (id, token, expires) VALUES (1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ1MDEzNjcyLCJleHAiOjE2NDU2MTg0NzJ9.JRBy9BVadUsQINV6_PZHd3PXYhYy550gG9py9S2_cjY', '2022-02-16 18:04:32.596');
INSERT INTO users.tokens (id, token, expires) VALUES (22, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIsImlhdCI6MTY0NTAxMzkzMSwiZXhwIjoxNjQ1NjE4NzMxfQ.-9t3b9DH_0IoSPWQVDfyYDQckwc2pYq5Ov64hQ21K3s', '2022-02-16 18:08:51.455');
INSERT INTO users.tokens (id, token, expires) VALUES (1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ1MDE1NjI3LCJleHAiOjE2NDU2MjA0Mjd9.Y1wB8zT1BPLvEU0q0jlnZdaFijlneqT2R3WRfkzXBCQ', '2022-02-16 18:37:07.673');
INSERT INTO users.tokens (id, token, expires) VALUES (1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ1MDE1NjQ1LCJleHAiOjE2NDU2MjA0NDV9.LM52v45Y3aX5jnMurEioOw0Au1pcsOn9ZcHd08bu1Tk', '2022-02-16 18:37:25.69');
INSERT INTO users.tokens (id, token, expires) VALUES (1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ1MDIzNzYyLCJleHAiOjE2NDU2Mjg1NjJ9.K5r9rDwakWcuKyCh6wxI8wKyLizovxeUtSVfxQEybxM', '2022-02-16 20:52:42.506');
INSERT INTO users.tokens (id, token, expires) VALUES (1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ1MDIzODIyLCJleHAiOjE2NDU2Mjg2MjJ9.fazlhW_XO9ZV6aUOTUOdK2jtfvpBqG7E3RclYR1WM8M', '2022-02-16 20:53:42.381');
INSERT INTO users.tokens (id, token, expires) VALUES (1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ1MDIzODQzLCJleHAiOjE2NDU2Mjg2NDN9.fhpr7kqi7CTAY8ll7UCeppuujf_L1arKgmS4f6ZzEsI', '2022-02-16 20:54:03.687');
INSERT INTO users.tokens (id, token, expires) VALUES (1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ1MDI0MDc2LCJleHAiOjE2NDU2Mjg4NzZ9.JHRdOuCbnHUYYPcYcJBmCycnkmg4fzzyZzSnkA37fkY', '2022-02-16 20:57:56.853');
INSERT INTO users.tokens (id, token, expires) VALUES (1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ1MDM2NTgxLCJleHAiOjE2NDU2NDEzODF9.DX5ePxz6g4PZQDq5enalwAMcE6WQ2Crl8YK-TvyoUAc', '2022-02-17 00:26:21.035');
INSERT INTO users.tokens (id, token, expires) VALUES (1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ1MDM3NDA4LCJleHAiOjE2NDU2NDIyMDh9.k7irnJDTGODvO8Z77Zb5D2Lk6yjHuwm6r9UuBfTpuBw', '2022-02-17 00:40:08.133');
INSERT INTO users.tokens (id, token, expires) VALUES (23, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMsImlhdCI6MTY0NTA1MjIzOSwiZXhwIjoxNjQ1NjU3MDM5fQ.F7sbLZ5uTiEjihmZd_VHroUIUjOwipVNY9QGgkW1Z0o', '2022-02-16 23:17:19.545');


--
-- TOC entry 3327 (class 0 OID 0)
-- Dependencies: 210
-- Name: data_id_seq; Type: SEQUENCE SET; Schema: users; Owner: charukahs
--

SELECT pg_catalog.setval('users.data_id_seq', 23, true);


-- Completed on 2022-02-17 16:07:47

--
-- PostgreSQL database dump complete
--

-- Completed on 2022-02-17 16:07:47

--
-- PostgreSQL database cluster dump complete
--


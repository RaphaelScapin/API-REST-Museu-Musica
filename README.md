# Museu da Música – Itu

Repositório do projeto integrado do Museu da Música – Itu. A API REST existente permanece em `src/`; o site institucional está em `public/` e é servido pelo Express como conteúdo estático.

## Site institucional

- `public/index.html`: página inicial.
- `public/tour-virtual.html`: prévia ilustrada do Tour Virtual.
- `public/css/`, `public/js/` e `public/img/`: estilos, interações e ilustrações locais.
- `escopo_museu_itu.md`: escopo funcional e técnico do site.

O tour 360° ainda não foi fornecido pelo museu. A página apresenta uma prévia ilustrada, identifica essa limitação e pode receber a URL de incorporação em `public/js/main.js`, na constante `TOUR_EMBED_URL`.

## Executar o servidor Express

Instale as dependências com `npm install` e inicie a API com `npm start`. O servidor disponibiliza os arquivos de `public/` e as rotas REST definidas em `src/`. A inicialização também testa a conexão MySQL, portanto configure as variáveis de ambiente `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD` e `DB_NAME` para o ambiente local. Não publique senhas ou arquivos `.env`.

## Publicar o site pelo GitHub Pages

O workflow `.github/workflows/pages.yml` publica o conteúdo de `public/` no GitHub Pages quando há alterações na branch `Dev` ou quando o workflow é executado manualmente. O workflow envia somente o site estático; a API Express e o banco MySQL não são hospedados pelo Pages.

Para ativar a publicação:

1. No repositório, abra **Settings > Pages**.
2. Em **Build and deployment**, selecione **GitHub Actions** como origem.
3. Envie alterações para `Dev` ou execute manualmente o workflow **Publicar site no GitHub Pages** na aba **Actions**.
4. Consulte **Settings > Pages** para acessar o endereço público. A primeira publicação e as atualizações podem levar alguns minutos.

As páginas usam caminhos relativos e podem ser servidas na raiz do site publicado. Para publicar a partir de outra branch, ajuste o gatilho do workflow.

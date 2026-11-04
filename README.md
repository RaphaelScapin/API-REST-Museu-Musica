# Museu da Música – Itu

Site institucional responsivo do Museu da Música – Itu, desenvolvido como entrega do Projeto Integrador 2. Esta versão inclui a página inicial, uma prévia ilustrada do Tour Virtual e navegação compartilhada entre as páginas.

## Estrutura

```text
.
├── index.html
├── tour-virtual.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── img/
│   ├── logo.svg
│   ├── hero-home.svg
│   ├── hero-tour.svg
│   ├── sobre-casa.svg
│   ├── mostra-popular.svg
│   ├── mostra-sacra.svg
│   ├── mostra-domestico.svg
│   ├── tour-preview.svg
│   ├── voluntariado.svg
│   └── ambiente-*.svg
└── README.md
```

As ilustrações SVG são assets locais de demonstração, não fotografias do museu. Substitua-as por imagens institucionais autorizadas quando estiverem disponíveis, mantendo os textos alternativos e as proporções dos componentes.

## Visualizar localmente

Abra `index.html` em um navegador ou use a extensão Live Server do VS Code na pasta do projeto. O Bootstrap e as fontes Roboto são carregados por CDN e, portanto, precisam de conexão com a internet; os arquivos HTML, CSS, JavaScript e imagens são locais.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub. Mantenha `index.html` e `tour-virtual.html` na raiz do repositório e envie também as pastas `css/`, `js/` e `img/`.
2. Se ainda não houver repositório Git local, abra o terminal na pasta do projeto e execute:

   ```bash
   git init
   git add index.html tour-virtual.html css js img README.md
   git commit -m "Publica site do Museu da Música de Itu"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
   git push -u origin main
   ```

   Troque `SEU-USUARIO` e `SEU-REPOSITORIO` pelos dados do repositório criado. Se o projeto já estiver versionado e conectado ao GitHub, basta adicionar, criar um commit e enviar as alterações para a branch principal.
3. No repositório, abra **Settings > Pages**.
4. Em **Build and deployment**, escolha **Deploy from a branch**; selecione a branch `main` e a pasta `/ (root)` e salve.
5. Aguarde a publicação. O GitHub Pages exibirá o endereço do site nessa mesma seção; abra-o para conferir a Home e navegue até o Tour Virtual.
6. Para publicar atualizações, envie os commits para a branch `main`. A atualização do endereço público pode levar alguns minutos.

Não é necessário processo de build, servidor próprio ou segredo no código para a publicação.

## Tour Virtual

O museu ainda não dispõe do tour 360° previsto no escopo. A página identifica essa limitação e oferece uma experiência de prévia com ilustrações, seletor de ambientes, descrições, tela cheia e opção de reiniciar. O controle de áudio permanece desativado porque não há áudio institucional fornecido.

Quando o museu fornecer a URL de incorporação, configure a constante `TOUR_EMBED_URL` em `js/main.js`. Use apenas uma URL HTTPS (ou HTTP em ambiente de desenvolvimento) de um visualizador confiável que permita incorporação por `iframe`; confirme também que o serviço de destino autoriza a incorporação. A página inclui o título, o carregamento tardio e a permissão de tela cheia para esse iframe.

## Conteúdo e validação

Os dados de endereço, horário, entrada, contato, edifício e temas das salas refletem o escopo do projeto. Textos de chamada e ilustrações são demonstrativos e devem ser revisados pelo museu antes de uma publicação institucional definitiva. A identidade gráfica do Instituto Cultural de Itu está representada apenas por uma marca tipográfica provisória. Os perfis e os logotipos oficiais de parceiros devem ser adicionados quando seus arquivos e endereços forem confirmados. Links para agendamento e voluntariado iniciam um e-mail para `museudamusica@itu.com.br`; os links para partituras e exposições apontam para o site oficial.

Valide o layout em 375px, 768px, 1024px e 1440px, incluindo a navegação por teclado, o menu colapsado, links de e-mail, seleção de ambientes e modo de tela cheia.

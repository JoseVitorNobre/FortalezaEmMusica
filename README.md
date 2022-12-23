<h1 align="center">
  Fortaleza em Musica
</h1>

## Sobre o Projeto
A aplicação Fortaleza em Música, desenvolvida como Trabalho de Conclusão de Curso no curso de Sistemas e Mídias Digitais da UFC (Noronha, 2021), tem como objetivo mapear as músicas sobre Fortaleza, exibindo informações sobre o compositor da música, banda, inspirações, permitindo também ao usuário sugerir outras músicas e realizar comentários sobre elas. No presente momento a aplicação web não tem suporte a um cadastro, dessa forma impossibilitando as sugestões e os comentarios.
</br>

## Funcionalidades
**Pegar Localização** - Você pode ver qual a sua localização atual e com isso ter referencia da sua distancia em relação aos pontos do mapa
</br>

**Vizualizar Pontos** - Ao clicar em um ponto do mapa, você pode vizualizar as informações daquele ponto, como: nome do artista, suas inspirações, letra da musica e etc.

## Como usar
Após clonar o repositorio execute esse comando no terminal:
```bash
  npm install
```
Esse comando irá instalar todas as dependencias que o codigo precisa.
Em seguida será necessario gerar as keys, a pasta das keys se encontram no caminho
``
  src\keys
``
por questões de segurança as keys oficiais não constam aqui, caso você queira usar o sistema ou você deverá entrar em contato comigo para pedir as keys, ou você também pode gerar suas proprias keys, as keys que você precisa gerar, é uma para o mapa e outra para o firebase.
Para executar o codigo execute o comando:
```bash
  npm run dev
```

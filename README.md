# Conversor de imagens webp
Neste repositório é usado [FFmpeg](https://www.techtudo.com.br/tudo-sobre/ffmpegl/) uma poderosa 
ferramenta de manipulação de audios, imagens, vídeos e afins... para fazer a conversão de qualquer imagem para uma imagem .webp a partir de uma coleção de URLS

### 1) Instalar as depedências
Antes de qualquer coisa, precisamos do [FFmpeg](https://www.techtudo.com.br/tudo-sobre/ffmpegl/) configurado em nosso ambiente, [assita este vídeo](https://www.youtube.com/watch?v=Q267RF1I3GE&t=152s) 
de como fazer isso no seu computador Windows. Após instalar a ferramenta, podemos instalar nossas depedências javascript.
```
yarn install
```

### 2) Exemplo de como montar uma coleção de urls de imagens
No arquivo `./src/json/imagesCollectionUrl.json` teremos um json com um array com apenas um objeto como segue o exemplo abaixo.
Os links listados serão as imagens que iremos converter (imagens que ainda não são webp)
```
[
  {
    "url": "https://avatars.githubusercontent.com/gustrigoni"
  }
]
```

### 3) Rode o projeto
Após de ter feitos os passos anteriores, agora basta converter as imagens 😎
```
yarn start
```

As imagens originais ficam no seguinte caminho: `./src/images`

As imagens convertidas ficam no seguinte caminho: `./src/webp`

Relatorio da diferença de tamanho das imagens ficam no seguinte caminho: `./src/json/result.json`

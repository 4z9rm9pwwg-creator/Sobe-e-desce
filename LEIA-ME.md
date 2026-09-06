# Sobe e Desce — instalar no telemóvel

Ficheiros nesta pasta:

```
index.html              a app
manifest.webmanifest    nome, cor e ícones
sw.js                   faz a app funcionar sem internet
icon-192.png            ícone
icon-512.png            ícone
icon-maskable-512.png   ícone recortado (Android)
```

Todos têm de ficar na **mesma pasta**, com estes nomes.

---

## Caminho 1 — instalar sem APK (10 minutos, recomendado)

Uma app instalada a partir do browser. Ícone no ecrã principal, ecrã inteiro
sem barra de endereço, funciona sem rede. É o que a maioria das pessoas
chamaria "a app", e não exige que ninguém autorize instalações de fontes
desconhecidas.

1. Cria conta em github.com e um repositório novo, público, chamado por
   exemplo `sobe-e-desce`.
2. Carrega os seis ficheiros desta pasta para a raiz do repositório
   (botão *Add file* → *Upload files*).
3. No repositório: *Settings* → *Pages* → em *Branch* escolhe `main` e `/root`
   → *Save*. Ao fim de um ou dois minutos aparece o endereço, do género
   `https://o-teu-utilizador.github.io/sobe-e-desce/`.
4. Abre esse endereço no Chrome do telemóvel → menu dos três pontos →
   *Adicionar ao ecrã principal*. No iPhone é no Safari, botão de partilha →
   *Adicionar ao ecrã principal*.
5. Manda o link ao pessoal da mesa e cada um faz o mesmo.

Alternativas ao GitHub Pages, com o mesmo resultado: Netlify Drop
(arrastas a pasta para netlify.com/drop) ou Cloudflare Pages.

**Sempre que mudares o `index.html`**, muda também a linha `const VERSAO =`
no `sw.js` (v1 → v2 → v3...). Sem isso os telemóveis continuam a mostrar
a versão antiga guardada em cache.

---

## Caminho 2 — APK a sério

Um APK é sempre um embrulho à volta destes mesmos ficheiros. Nenhuma das
opções abaixo muda uma linha da app.

### 2a. PWABuilder (sem instalar nada)

Depois de teres o caminho 1 a funcionar:

1. Vai a pwabuilder.com e cola o endereço do site.
2. *Package for stores* → Android.
3. Descarrega o pacote. Vem com o `.apk` para instalação directa e o `.aab`
   para a Play Store, mais a chave de assinatura — **guarda essa chave**, sem
   ela não consegues publicar actualizações da mesma app.

Nota: o APK gerado é uma *Trusted Web Activity*, ou seja, mostra o site em
ecrã inteiro. Se o site sair do ar, a app deixa de abrir. Para uma app de
apontar pontos numa mesa de jantar isto é aceitável porque o service worker
guarda tudo localmente, mas é uma dependência real.

### 2b. Capacitor (app verdadeiramente offline)

Empacota os ficheiros dentro do APK, sem depender de nenhum site. Precisas de
Node.js e Android Studio no computador.

```bash
npm create @capacitor/app sobedesce
cd sobedesce
# apaga o conteúdo de www/ e mete lá os seis ficheiros desta pasta
npx cap add android
npx cap sync
npx cap open android      # abre o Android Studio: Build → Build APK
```

---

## Antes de distribuires o APK

A partir de 30 de setembro de 2026 a Google passa a exigir que as apps
instaladas fora da Play Store venham de programadores com identidade
verificada. Arranca no Brasil, Indonésia, Singapura e Tailândia, e alarga-se
ao resto do mundo durante 2027. Em Portugal ainda não afecta nada, mas se a
ideia for uma app para durar, o caminho 1 não tem este problema.

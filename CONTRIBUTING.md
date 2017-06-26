[![N|Solid](https://avatars3.githubusercontent.com/u/7250733?v=3&s=200)](https://avatars3.githubusercontent.com/u/7250733?v=3&s=200)
## Contribuindo para o Harlan

[![N|Solid](https://www.harlan.com.br/images/android/drawable-ldpi/ic_launcher.png)](https://www.harlan.com.br/images/android/drawable-ldpi/ic_launcher.png)

Em primeiro lugar, obrigado por considerar contribuir com o Harlan. São pessoas
Como você que faz do Harlan uma ótima ferramenta.
 Estas são principalmente diretrizes, e não regras. Use seu melhor julgamento e sinta-se à vontade para propor mudanças neste documento em um pedido de pull request.

### 1. Por onde começar?

Se você notou um erro ou tem uma pergunta que não pertence ao Harlan
[Lista de correspondência] (http://groups.google.com/group/bipbop) ou
[Telegram] (https://web.telegram.org/#/im?p=c1130342554_15285734564282464304),
[Procure o rastreador de problemas] (https://github.com/bipbop/harlan/issues?q=something)
Para ver se outra pessoa na comunidade já criou um ticket.
Se não, vá em frente e [crie um](https://github.com/bipbop/harlan/issues/new)!

### 2. Fork & create uma branch

Caso neste projeto, você acha que pode consertar, contribuir ou aprimorar então
[Fork Harlan] (https://help.github.com/articles/fork-a-repo)
E crie um ramo com um nome descritivo.

Um bom nome de branch seria (onde o número 159 é o issue no qual você está trabalhando):

```sh
git checkout -b 325-add-american-translations
```
------
## Dependências

Tentamos não reinventar a roda, então o Harlan é construído com outros projetos de código aberto:

Tool                  | Description
--------------------- | -----------
[NodeJs]             | Uma plataforma construída sobre o motor JavaScript do Google Chrome para facilmente construir aplicações de rede rápidas e escaláveis
[Compass]            | O Compass é um framework de estilos de estilo Sass que simplifica a criação e manutenção de CSS.
[Bower]              | O Bower pode gerenciar componentes que contêm HTML, CSS, JavaScript, fontes ou até mesmo arquivos de imagem.
[Async]               | O Async é um módulo de utilitário que fornece straight-forward.
[babel]              | Powerful, transpiler
[Gulp]               | Um conjunto de ferramentas para automatizar tarefas dolorosas ou demoradas em seu fluxo de trabalho de desenvolvimento, para que você possa parar de mexer e construir algo.

[Async]: https://caolan.github.io/async/
[babel]: https://babeljs.io
[Bower]: https://bower.io/
[Compass]: https://rubygems.org/gems/compass/versions
[NodeJs]: https://nodejs.org/en/
[Gulp]: http://gulpjs.com/

----------
### 3. Instalação

Agora, instale as dependências de desenvolvimento:

Para realizar o deploy do Harlan será necessário que você tenha instalado um ambiente que conte com NodeJS, Compass e Bower.

# apt-get install nodejs bundler

```sh
$npm install
$bower install
$npm build
```

Agora você deve poder executar o conjunto inteiro usando:

```sh
$gulp
```

A execução deste comando tem como objetivo complilar todos módulos e subir um servidor em: http://localhost:3000

Se ocorrer falha ao subir o servidor verifique o log de exeução da ferramenta Gulp para verificar possível falha em carregar uma dependência.

### 4. Veja suas alterações de forma automatica

Através da tarefa do Gulp [watch] é possível desenvolver de forma prática e rapida sem a necessidade de atualizações manuais, pois o Harlan utiliza a tecnologia "browser-sync" para buscar um melhor desempenho de desenvolvimento. 

#### 5. Você encontrou um bug?

* ** Verifique se o bug já não foi relatado ** pesquisando no GitHub sob [Issues](https://github.com/bipbop/harlan/issues).

* Se você não consegue encontrar um problema aberto abordando o problema,[open a new one](https://github.com/bipbop/harlan/new). 
Certifique-se de incluir um título ** e uma descrição clara **, tanta informação relevante quanto possível,
E um ** exemplo de código ** ou um ** caso de teste executável ** demonstrando o comportamento esperado que não está ocorrendo.

* Se possível, use os modelos de relatório de erros relevantes para criar o problema.
Simplesmente copie o conteúdo do modelo apropriado em um arquivo .rb, faça as alterações necessárias para demonstrar o problema,
E ** colar o conteúdo na descrição do problema **:
  * [**Halan  1** issues](https://github.com/harlan/master/lib/bug_report_templates/rails_5_master.rb)

### 6. Implementar sua correção ou recurso

Neste ponto, você está pronto para fazer suas mudanças! Sinta-se à vontade para pedir ajuda;
Todos são iniciantes no início: smile_cat:

### 7. Crie um Pull Request

Neste ponto, você deve voltar para sua branch master e certificar-se de que é
Atualizado com a brach masster do Harlan:

```sh
git remote add upstream git@github.com:harlan/harlan.git
git checkout master
git pull upstream master
```

Em seguida, atualize sua branch de recursos da sua cópia local do master e push it!

```sh
git checkout 159-add-american-translations
git rebase master
git push --set-upstream origin 159-add-american-translations
```

Finalmente, vá para GitHub e
[make a Pull Request](https://help.github.com/harlan/creating-a-pull-request)
:D
### 8. Mantendo seu pedido de solicitação atualizada

Se um mantenedor pede que você "rebase" seu PR, eles estão dizendo que muitos códigos
Mudou, e que você precisa atualizar sua brach, por isso é mais fácil de mesclar.

Para saber mais sobre rebasing no Git, há um monte de
[good](http://git-scm.com/book/en/Git-Branching-Rebasing)
[resources](https://help.github.com/articles/interactive-rebase),
but here's the suggested workflow:

```sh
git checkout 159-add-american-translations
git pull --rebase upstream master
git push --force-with-lease 159-add-american-translations
```


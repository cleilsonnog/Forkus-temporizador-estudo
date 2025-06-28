const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const botaoIniciar = document.querySelector('.app__card-primary-button')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBt = document.querySelector('#start-pause')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const displayTempo = document.querySelector('#timer')
const banner = document.querySelector('.app__image')
const tituloApp = document.querySelector('.app__title')
const musicaFocoInput = document.querySelector('#alternar-musica')
const iniciarOuPausarBtIcone = document.querySelector('.app__card-primary-butto-icon')
const tempoNaTela = document.querySelector('#timer')
const dataAtual = document.querySelector('.app__footer-text')

const musica = new Audio('/sons/luna-rise-part-one.mp3')
const audioPlay = new Audio('/sons/play.wav');
const audioPausa = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3')
musica.loop = true

let tempoDecorridoEmSegundos = 15
let intervaloId = null


musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')//add o hover do botao fundo azul
})
//abaixo modelo de refatoração do codigo que e utilizado acima em cada evento do click, para não ter que escrever a mesma coisa en cada click
function alterarContexto(contexto) {
    maostrarTempo()
    botoes.forEach(function(contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            tituloApp.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            tituloApp.innerHTML = `
            Que tal dar uma respirada?<br>
                <strong class="app__title-strong"> Faça uma pausa curta!</strong>
            `
            break;
        case "descanso-longo":
            tituloApp.innerHTML = `
            Hora de voltar à superfície.<br>
               <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
        default:   
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0) {
        audioTempoFinalizado.play()
        alert('Tempo finalizado') 
        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        if (focoAtivo) {
            const evento = new CustomEvent('FocoFinalizado')
            document.dispatchEvent(evento)
        }
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    //console.log('temporizador:' + tempoDecorridoEmSegundos)
    maostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if(intervaloId) {
        audioPausa.play()
        zerar()
        return
    }
    audioPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = "Pausar"
    iniciarOuPausarBtIcone.setAttribute('src',`/imagens/pause.png`)
}

function zerar() {
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = "Começar"
    iniciarOuPausarBtIcone.setAttribute('src',`/imagens/play_arrow.png`)
    intervaloId = null
}

function maostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

function data() {
    const date = new Date()
    dataAtual.textContent += date
}
maostrarTempo()
data()

//const data = new Date();
//const formatador = new Intl.DateTimeFormat('pt-BR', {
 // year: 'numeric',
  //month: 'long',
  //day: 'numeric'
//});

//const dataFormatada = formatador.format(data);
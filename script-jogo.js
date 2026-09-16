const desafios = [
    {
        pergunta: "Qual é uma das principais funções do aprendizado de máquina na medicina?",
        alternativas: [
            "Aprender com dados e melhorar suas análises ao longo do tempo",
            "Substituir completamente os profissionais de saúde",
            "Eliminar a necessidade de dados médicos",
            "Impedir a análise de padrões"
        ],
        correta: 0,
        explicacao: "O aprendizado de máquina identifica padrões em dados e aperfeiçoa seus resultados com novas informações."
    },
    {
        pergunta: "Como a inteligência artificial deve atuar na tomada de decisões médicas?",
        alternativas: [
            "Como única responsável pelo diagnóstico",
            "Como apoio ao profissional, que mantém a decisão final",
            "Sem supervisão ou avaliação humana",
            "Apenas para substituir consultas"
        ],
        correta: 1,
        explicacao: "A IA apoia médicos com análises e previsões, mas a decisão deve permanecer sob supervisão profissional."
    },
    {
        pergunta: "Em qual etapa do desenvolvimento de medicamentos a IA pode prever possíveis efeitos colaterais?",
        alternativas: [
            "Na criação do logotipo do medicamento",
            "Na publicação de materiais de divulgação",
            "Em simulações e previsões durante a pesquisa",
            "Somente depois que o tratamento chega ao paciente"
        ],
        correta: 2,
        explicacao: "Simulações e algoritmos ajudam a avaliar resultados e possíveis efeitos colaterais antes das etapas finais."
    },
    {
        pergunta: "Qual é um desafio importante do uso da IA na saúde?",
        alternativas: [
            "A privacidade e a segurança dos dados dos pacientes",
            "A ausência total de dados para análise",
            "A impossibilidade de processar informações",
            "A falta de qualquer benefício na medicina"
        ],
        correta: 0,
        explicacao: "Dados de pacientes precisam ser protegidos, e seu uso deve respeitar privacidade, segurança e regulamentação."
    },
    {
        pergunta: "Qual visão representa o futuro da IA na saúde apresentado pelo site?",
        alternativas: [
            "Tecnologia trabalhando sem participação humana",
            "A tecnologia sendo usada apenas em laboratórios",
            "Pessoas e tecnologia colaborando para um cuidado melhor",
            "A interrupção do desenvolvimento de novos tratamentos"
        ],
        correta: 2,
        explicacao: "O futuro proposto é colaborativo, unindo pessoas e tecnologia para tornar o cuidado mais inteligente e humano."
    }
];

const inicio = document.querySelector(".botao-comecar");
const hero = document.querySelector(".hero");
let desafioAtual = 0;
let pontuacao = 0;

function iniciarJogo() {
    desafioAtual = 0;
    pontuacao = 0;
    mostrarDesafio();
}

function mostrarDesafio() {
    const desafio = desafios[desafioAtual];
    const porcentagem = (desafioAtual / desafios.length) * 100;

    hero.innerHTML = `
        <main class="painel-jogo" id="painel-jogo">
            <div class="cabecalho-jogo">
                <span class="etiqueta-jogo">DESAFIO MÉDICO</span>
                <span class="contador-desafios">${desafioAtual + 1} DE ${desafios.length}</span>
            </div>
            <div class="progresso-jogo" aria-label="Progresso do jogo">
                <span class="progresso-preenchido" style="width: ${porcentagem}%"></span>
            </div>
            <p class="categoria-jogo">IA NA MEDICINA</p>
            <h1 class="pergunta-jogo">${desafio.pergunta}</h1>
            <div class="alternativas-jogo" id="alternativas-jogo"></div>
            <div class="rodape-jogo">
                <p class="pontuacao-jogo">PONTOS: <strong>${pontuacao}</strong></p>
                <p class="feedback-jogo" id="feedback-jogo" aria-live="polite"></p>
                <button class="botao-proximo" id="botao-proximo" type="button" disabled>PRÓXIMO DESAFIO</button>
            </div>
        </main>
    `;

    const alternativas = document.querySelector("#alternativas-jogo");
    desafio.alternativas.forEach((alternativa, indice) => {
        const botao = document.createElement("button");
        botao.className = "alternativa-jogo";
        botao.type = "button";
        botao.dataset.indice = indice;
        botao.textContent = alternativa;
        botao.addEventListener("click", () => responder(indice));
        alternativas.appendChild(botao);
    });

    document.querySelector("#botao-proximo").addEventListener("click", proximoDesafio);
}

function responder(indiceSelecionado) {
    const desafio = desafios[desafioAtual];
    const alternativas = document.querySelectorAll(".alternativa-jogo");
    const feedback = document.querySelector("#feedback-jogo");
    const botaoProximo = document.querySelector("#botao-proximo");
    const acertou = indiceSelecionado === desafio.correta;

    alternativas.forEach((alternativa, indice) => {
        alternativa.disabled = true;
        if (indice === desafio.correta) {
            alternativa.classList.add("correta");
        }
        if (indice === indiceSelecionado && !acertou) {
            alternativa.classList.add("incorreta");
        }
    });

    if (acertou) {
        pontuacao += 100;
        feedback.innerHTML = `<strong>RESPOSTA CORRETA!</strong> ${desafio.explicacao}`;
    } else {
        feedback.innerHTML = `<strong>RESPOSTA INCORRETA.</strong> ${desafio.explicacao}`;
    }

    document.querySelector(".pontuacao-jogo strong").textContent = pontuacao;
    botaoProximo.disabled = false;
    botaoProximo.textContent = desafioAtual === desafios.length - 1 ? "VER RESULTADO" : "PRÓXIMO DESAFIO";
}

function proximoDesafio() {
    if (desafioAtual < desafios.length - 1) {
        desafioAtual += 1;
        mostrarDesafio();
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    const aproveitamento = Math.round((pontuacao / (desafios.length * 100)) * 100);
    let mensagem = "Continue explorando os conteúdos sobre IA na medicina.";

    if (aproveitamento === 100) {
        mensagem = "Excelente! Você domina os principais conceitos apresentados pelo site.";
    } else if (aproveitamento >= 60) {
        mensagem = "Muito bem! Você compreendeu os pontos essenciais sobre IA e saúde.";
    }

    hero.innerHTML = `
        <main class="painel-jogo resultado-jogo" id="resultado-jogo">
            <span class="etiqueta-jogo">DESAFIO CONCLUÍDO</span>
            <h1 class="titulo-resultado">${pontuacao}<span> PONTOS</span></h1>
            <p class="aproveitamento-jogo">VOCÊ ACERTOU ${pontuacao / 100} DE ${desafios.length} DESAFIOS</p>
            <p class="mensagem-resultado">${mensagem}</p>
            <button class="botao-reiniciar" id="botao-reiniciar" type="button">JOGAR NOVAMENTE</button>
        </main>
    `;

    document.querySelector("#botao-reiniciar").addEventListener("click", iniciarJogo);
}

inicio.addEventListener("click", (evento) => {
    evento.preventDefault();
    iniciarJogo();
});

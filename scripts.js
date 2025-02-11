// scripts.js
// Todo seu JavaScript aqui


    // Inicialização do AOS
    document.addEventListener('DOMContentLoaded', function() {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    });

    // Animação dos números
    function animateNumber(element) {
        const final = parseInt(element.getAttribute('data-value'));
        let current = 0;
        const increment = Math.ceil(final / 50);

        const timer = setInterval(() => {
            current += increment;
            if (current >= final) {
                current = final;
                clearInterval(timer);
                if (element.nextElementSibling.textContent.includes('dos')) {
                    element.textContent = `${current}%`;
                } else {
                    element.textContent = current;
                }
            } else {
                element.textContent = current;
            }
        }, 30);
    }

    // Configuração do Observer
    const numberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
                numberObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    // Inicialização quando o DOM estiver pronto
    document.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('.stat-number').forEach(number => {
            numberObserver.observe(number);
        });
    });


    // Funções do Modal
    function openModal(plan) {
        document.getElementById('leadModal').style.display = 'block';
        document.getElementById('plan').value = plan;
    }

    function closeModal() {
        document.getElementById('leadModal').style.display = 'none';
    }

    // Fechar modal ao clicar fora
    window.onclick = function(event) {
        if (event.target == document.getElementById('leadModal')) {
            closeModal();
        }
    }

    // Envio do formulário
    function submitForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const whatsapp = document.getElementById('whatsapp').value;
    const plan = document.getElementById('plan').value;
    
    // Número do WhatsApp que receberá as mensagens (substitua pelo número correto)
    const adminWhatsapp = "5517991616242"; // Substitua pelo seu número
    
    // Formata a mensagem como um "card"
    const message = `🚀 *Novo Contato do Site Autozapi*
---------------------------------------------------
👤 *Olá! Eu sou* ${name}
📧 *Este é meu e-mail:* ${email}
📱 *E este é meu WhatsApp:* ${whatsapp}
📋 *Estou interssado no plano:* ${plan}
💡 *Aguardarei o contato do Especialita. Obrigado!*
---------------------------------------------------
 *Origem:* Site AutoZapi`;

    // Codifica a mensagem para URL
    const encodedMessage = encodeURIComponent(message);
    
    // Cria o link do WhatsApp
    const whatsappLink = `https://api.whatsapp.com/send?phone=${adminWhatsapp}&text=${encodedMessage}`;
    
    // Limpa o formulário e fecha o modal
    event.target.reset();
    closeModal();
    
    // Abre o WhatsApp em uma nova aba
    window.open(whatsappLink, '_blank');
}



    // Máscara para o campo de telefone
    document.getElementById('whatsapp').addEventListener('input', function (e) {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    });



// FAQ Toggle
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Fecha todos os itens
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Abre o item clicado se não estava ativo
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});


/* INÍCIO STATS SECTION SCRIPTS - DESATIVADO
const countUpAnimation = () => {
    const numbers = document.querySelectorAll('.stat-number');
    
    numbers.forEach(number => {
        const target = parseInt(number.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateNumber = () => {
            if (current < target) {
                current = Math.min(current + increment, target);
                number.textContent = Math.round(current).toLocaleString();
                requestAnimationFrame(updateNumber);
            }
        };

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateNumber();
                observer.disconnect();
            }
        });

        observer.observe(number);
    });
};

document.addEventListener('DOMContentLoaded', countUpAnimation);
FIM STATS SECTION SCRIPTS - DESATIVADO */

<!-- Script do Newsletter -->
document.getElementById('newsletterForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = this;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    
    // Desabilita o botão durante o envio
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';
    
    const formData = new FormData();
    formData.append('email', form.querySelector('input[name="email"]').value);

    fetch('newsletter.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Inscrição realizada com sucesso! Verifique seu email.');
            form.reset();
        } else {
            alert(data.message || 'Erro ao processar inscrição. Tente novamente.');
        }
    })
    .catch(error => {
        alert('Erro ao processar inscrição. Tente novamente.');
        console.error('Erro:', error);
    })
    .finally(() => {
        // Reativa o botão após o processamento
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    });
});

// Final CTA - Abrir modal
        const finalCTA = document.getElementById('final-cta');
        if (finalCTA) {
            finalCTA.addEventListener('click', function() {
                if (typeof openModal === 'function') {
                    openModal('Teste 4 dias grátis');
                } else {
                    console.error('função openModal não encontrada');
                }
            });
        }
    });


    // Aguarda o DOM ser completamente carregado
    document.addEventListener('DOMContentLoaded', function() {
        // Header CTA - Rolagem suave até os planos
        document.getElementById('header-cta').addEventListener('click', function() {
            document.getElementById('plans').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });

        // Final CTA - Abre modal de teste grátis
        document.getElementById('final-cta').addEventListener('click', function() {
            openModal('Teste 4 dias grátis');
        });
    });

});
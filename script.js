/**
 * Guia Completo de Help Desk - Script Global
 * Arquivo de referência na raiz do projeto
 * Funcionalidades principais gerenciadas via React em client/src/
 */

// Configurações Globais
const CONFIG = {
    siteName: 'Guia Completo de Help Desk',
    siteUrl: 'https://helpdeskguide.com.br',
    author: 'Reinaldo Honorio Neto',
    email: 'reimentutors@gmail.com',
    linkedin: 'https://linkedin.com/in/reinaldohneto',
    github: 'https://github.com/reimen83',
    version: '2.0.0',
    releaseDate: 'Janeiro 2026'
};

// Utilitários
const Utils = {
    /**
     * Log estruturado para desenvolvimento
     */
    log: (message, type = 'info') => {
        const timestamp = new Date().toLocaleTimeString('pt-BR');
        const styles = {
            info: 'color: #0066cc; font-weight: bold;',
            success: 'color: #00a86b; font-weight: bold;',
            warning: 'color: #ff9800; font-weight: bold;',
            error: 'color: #d32f2f; font-weight: bold;'
        };
        console.log(`%c[${timestamp}] ${message}`, styles[type] || styles.info);
    },

    /**
     * Verificar se elemento existe
     */
    elementExists: (selector) => {
        return document.querySelector(selector) !== null;
    },

    /**
     * Adicionar classe a elemento
     */
    addClass: (selector, className) => {
        const element = document.querySelector(selector);
        if (element) {
            element.classList.add(className);
        }
    },

    /**
     * Remover classe de elemento
     */
    removeClass: (selector, className) => {
        const element = document.querySelector(selector);
        if (element) {
            element.classList.remove(className);
        }
    },

    /**
     * Toggle classe
     */
    toggleClass: (selector, className) => {
        const element = document.querySelector(selector);
        if (element) {
            element.classList.toggle(className);
        }
    }
};

// Analytics
const Analytics = {
    /**
     * Rastrear evento
     */
    trackEvent: (eventName, eventData = {}) => {
        if (window.umami) {
            window.umami.track(eventName, eventData);
            Utils.log(`Evento rastreado: ${eventName}`, 'success');
        }
    },

    /**
     * Rastrear visualização de página
     */
    trackPageView: (pageName) => {
        Analytics.trackEvent('page_view', { page: pageName });
    }
};

// Storage Local
const Storage = {
    /**
     * Salvar dados no localStorage
     */
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            Utils.log(`Dados salvos: ${key}`, 'success');
        } catch (error) {
            Utils.log(`Erro ao salvar: ${error.message}`, 'error');
        }
    },

    /**
     * Recuperar dados do localStorage
     */
    get: (key) => {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            Utils.log(`Erro ao recuperar: ${error.message}`, 'error');
            return null;
        }
    },

    /**
     * Remover dados do localStorage
     */
    remove: (key) => {
        try {
            localStorage.removeItem(key);
            Utils.log(`Dados removidos: ${key}`, 'success');
        } catch (error) {
            Utils.log(`Erro ao remover: ${error.message}`, 'error');
        }
    },

    /**
     * Limpar todo o localStorage
     */
    clear: () => {
        try {
            localStorage.clear();
            Utils.log('localStorage limpo', 'success');
        } catch (error) {
            Utils.log(`Erro ao limpar: ${error.message}`, 'error');
        }
    }
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    Utils.log(`${CONFIG.siteName} v${CONFIG.version} carregado`, 'success');
    
    // Rastrear visualização de página
    Analytics.trackPageView(document.title);
    
    // Verificar suporte a localStorage
    if (typeof(Storage) === 'undefined') {
        Utils.log('localStorage não suportado', 'warning');
    }
});

// Exportar para uso global
window.HelpDeskGuide = {
    config: CONFIG,
    utils: Utils,
    analytics: Analytics,
    storage: Storage
};

// Log de inicialização
Utils.log(`Configuração: ${JSON.stringify(CONFIG)}`, 'info');

// Añadir esto a tu archivo script.js existente

// Función para añadir selector de plantilla a la interfaz original
function addTemplateSwitcher() {
    const editorElement = document.querySelector('.editor');
    if (!editorElement) return;
    
    // Crear el selector de plantilla
    const switcherDiv = document.createElement('div');
    switcherDiv.className = 'template-switcher';
    switcherDiv.innerHTML = `
      <label for="template-select">Plantilla de CV:</label>
      <select id="template-select" onchange="switchTemplate()">
        <option value="original" selected>Original</option>
        <option value="ats">Optimizado para ATS</option>
      </select>
    `;
    
    // Insertar antes del primer elemento de la interfaz
    editorElement.insertBefore(switcherDiv, editorElement.firstChild);
  }
  
  // Función para cambiar entre plantillas
  function switchTemplate() {
    const templateType = document.getElementById('template-select').value;
    
    // Guardar los datos actuales para que estén disponibles en la otra plantilla
    saveCurrentData();
    
    if (templateType === 'original') {
      // Ya estamos en la plantilla original
    } else if (templateType === 'ats') {
      // Redirigir a la plantilla ATS
      window.location.href = 'ats-resume.html';
    }
  }
  
  // Función para guardar datos actuales en localStorage
  function saveCurrentData() {
    // Recopilar los datos del formulario actual
    const data = {
      fullName: document.getElementById('fullName').value,
      profession: document.getElementById('profession').value,
      profile: document.getElementById('profile').value,
      city: document.getElementById('city').value,
      phone: document.getElementById('phone').value,
      email: document.getElementById('email').value,
      // También puedes añadir el resto de secciones como experiencia, educación, etc.
      experience: getExperienceData(),
      education: getEducationData(),
      skills: getSkillsData(),
      languages: getLanguagesData(),
      projects: getProjectsData(),
      softSkills: getSoftSkillsData(),
      additionalInfo: getAdditionalInfoData()
    };
    
    // Guardar en localStorage para que esté disponible en la otra plantilla
    localStorage.setItem('resumeData', JSON.stringify(data));
  }
  
  // Funciones auxiliares para recopilar datos de las distintas secciones
  function getExperienceData() {
    const experienceItems = [];
    const experienceElements = document.querySelectorAll('#experienceEditor .experience-item');
    
    experienceElements.forEach(element => {
      const item = {
        position: element.querySelector('.position-input')?.value || '',
        company: element.querySelector('.company-input')?.value || '',
        startDate: element.querySelector('.start-date-input')?.value || '',
        endDate: element.querySelector('.end-date-input')?.value || '',
        description: element.querySelector('.description-input')?.value || ''
      };
      
      experienceItems.push(item);
    });
    
    return experienceItems;
  }
  
  function getEducationData() {
    const educationItems = [];
    const educationElements = document.querySelectorAll('#educationEditor .education-item');
    
    educationElements.forEach(element => {
      const item = {
        degree: element.querySelector('.degree-input')?.value || '',
        institution: element.querySelector('.institution-input')?.value || '',
        startDate: element.querySelector('.start-date-input')?.value || '',
        endDate: element.querySelector('.end-date-input')?.value || ''
      };
      
      educationItems.push(item);
    });
    
    return educationItems;
  }
  
  function getSkillsData() {
    const skillItems = [];
    const skillElements = document.querySelectorAll('#skillsEditor .skill-item');
    
    skillElements.forEach(element => {
      const item = {
        name: element.querySelector('.skill-name-input')?.value || '',
        level: element.querySelector('.skill-level-input')?.value || ''
      };
      
      skillItems.push(item);
    });
    
    return skillItems;
  }
  
  function getLanguagesData() {
    const languageItems = [];
    const languageElements = document.querySelectorAll('#languagesEditor .language-item');
    
    languageElements.forEach(element => {
      const item = {
        name: element.querySelector('.language-name-input')?.value || '',
        level: element.querySelector('.language-level-input')?.value || ''
      };
      
      languageItems.push(item);
    });
    
    return languageItems;
  }
  
  function getProjectsData() {
    const projectItems = [];
    const projectElements = document.querySelectorAll('#projectsEditor .project-item');
    
    projectElements.forEach(element => {
      const item = {
        name: element.querySelector('.project-name-input')?.value || '',
        description: element.querySelector('.project-description-input')?.value || '',
        link: element.querySelector('.project-link-input')?.value || ''
      };
      
      projectItems.push(item);
    });
    
    return projectItems;
  }
  
  function getSoftSkillsData() {
    const softSkillItems = [];
    const softSkillElements = document.querySelectorAll('#softSkillsEditor .soft-skill-item');
    
    softSkillElements.forEach(element => {
      const item = {
        name: element.querySelector('.soft-skill-name-input')?.value || ''
      };
      
      softSkillItems.push(item);
    });
    
    return softSkillItems;
  }
  
  function getAdditionalInfoData() {
    const additionalInfoItems = [];
    const additionalInfoElements = document.querySelectorAll('#additionalInfoEditor .additional-info-item');
    
    additionalInfoElements.forEach(element => {
      const item = {
        text: element.querySelector('.additional-info-text-input')?.value || ''
      };
      
      additionalInfoItems.push(item);
    });
    
    return additionalInfoItems;
  }
  
  // Añadir selector de plantilla cuando se carga la página
  document.addEventListener('DOMContentLoaded', function() {
    addTemplateSwitcher();
  });
  
  // === FUNCIONALIDAD ESPECÍFICA PARA ATS ===
  
  // Función para añadir palabras clave relevantes para ATS
  function addAtsKeyword() {
    const keywordInput = document.getElementById('ats-keyword-input');
    const keyword = keywordInput.value.trim();
    
    if (keyword) {
      const keywordsContainer = document.getElementById('ats-keywords');
      
      const keywordElement = document.createElement('span');
      keywordElement.className = 'keyword-pill';
      keywordElement.textContent = keyword;
      
      // Botón para eliminar la palabra clave
      const removeBtn = document.createElement('button');
      removeBtn.className = 'remove-keyword';
      removeBtn.innerHTML = '×';
      removeBtn.onclick = function() {
        keywordsContainer.removeChild(keywordElement);
      };
      
      keywordElement.appendChild(removeBtn);
      keywordsContainer.appendChild(keywordElement);
      
      // Limpiar el campo de entrada
      keywordInput.value = '';
    }
  }
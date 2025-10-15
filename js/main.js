document.addEventListener('DOMContentLoaded', () => {
    const commandInput = document.getElementById('terminal-command');
    const container = document.querySelector('.container');
    const projectsContainer = document.getElementById('projects-container');

    // Matrix rain effect
    const createMatrixRain = () => {
      const canvas = document.createElement('canvas');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      document.getElementById('matrix-canvas').appendChild(canvas);

      const ctx = canvas.getContext('2d');
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
      const columns = Math.floor(canvas.width / 15);
      const drops = [];

      for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * -100);
      }

      function draw() {
        ctx.fillStyle = 'rgba(7, 11, 18, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0ff';
        ctx.font = '15px var(--terminal-font)';

        for (let i = 0; i < drops.length; i++) {
          const text = characters.charAt(Math.floor(Math.random() * characters.length));
          ctx.fillText(text, i * 15, drops[i] * 15);

          if (drops[i] * 15 > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }

          drops[i]++;
        }
      }

      setInterval(draw, 35);

      // Handle window resize
      window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drops.length = 0;
        for (let i = 0; i < Math.floor(canvas.width / 15); i++) {
          drops[i] = Math.floor(Math.random() * -100);
        }
      });
    };

    // Fade-in sections as they become visible
    const fadeInSections = () => {
      const sections = document.querySelectorAll('.fade-in');
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      sections.forEach(section => {
        observer.observe(section);
      });
    };

    // Decrypt text effect
    const initDecryptAnimation = () => {
      const decryptElements = document.querySelectorAll('.decrypt-animation');

      decryptElements.forEach(element => {
        const text = element.textContent;
        element.setAttribute('data-text', text);
        element.setAttribute('data-value', Array(text.length).fill('$#%@&*!').join(''));

        element.addEventListener('mouseover', () => {
          element.style.animation = 'decrypt 1s steps(10) forwards';
        });

        element.addEventListener('mouseout', () => {
          element.style.animation = 'none';
          void element.offsetWidth; // Trigger reflow
          element.style.animation = 'decrypt 1s steps(10) forwards reverse';
        });
      });
    };

    // Update system stats in real time
    const updateSystemStats = () => {
      const progressBars = document.querySelectorAll('.progress-fill');

      setInterval(() => {
        progressBars.forEach(bar => {
          const currentWidth = parseInt(bar.style.width);
          const newWidth = Math.max(60, Math.min(99, currentWidth + Math.floor(Math.random() * 11) - 5));
          bar.style.width = `${newWidth}%`;
        });
      }, 5000);
    };

    // Typing animation for terminal text
    const typeText = (element, text, speed = 50) => {
      let i = 0;
      element.textContent = '';

      return new Promise(resolve => {
        const typing = setInterval(() => {
          element.textContent += text.charAt(i);
          i++;

          if (i > text.length) {
            clearInterval(typing);
            resolve();
          }
        }, speed);
      });
    };

    // Handle terminal navigation commands
    commandInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        const command = this.value.trim().toLowerCase();
        executeCommand(command);
        this.value = '';
      }
    });

    function executeCommand(cmd) {
        const outputDiv = document.createElement('div');
        outputDiv.className = 'command-history';

        const inputLine = document.createElement('div');
        inputLine.className = 'command command-input terminal-line';
        inputLine.textContent = cmd;

        const outputLine = document.createElement('div');
        outputLine.className = 'command-output';

        outputDiv.appendChild(inputLine);
        outputDiv.appendChild(outputLine);

        container.insertBefore(outputDiv, document.querySelector('.terminal-input-container'));

        // First scroll to the command output
        setTimeout(() => {
          outputDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);

        // Process commands
        switch(cmd) {
          case 'help':
            // For help, we'll create a special markup element to preserve the HTML structure
            const helpContent = `
              Available commands:<br>
              <ul>
                <li>home - Go to home section</li>
                <li>projects - View my projects</li>
                <li>skills - View my technical skills</li>
                <li>certifications - See my certifications</li>
                <li>education - Display my educational background</li>
                <li>tryhackme - View my TryHackMe profile</li>
                <li>about - Learn about me</li>
                <li>contact - Get my contact information</li>
                <li>clear - Clear the terminal</li>
                <li>github - Open my GitHub profile</li>
                <li>linkedin - Open my LinkedIn profile</li>
                <li>matrix - Toggle matrix rain effect</li>
                <li>date - Display current date</li>
                <li>whoami - Display current user</li>
                <li>sudo - Attempt to gain elevated privileges</li>
              </ul>
            `;
            // For help command, we need to handle HTML content differently
            const tempElement = document.createElement('div');
            tempElement.innerHTML = helpContent;
            outputLine.appendChild(tempElement);
            break;

          case 'home':
            typeText(outputLine, 'Navigating to home section...')
              .then(() => {
                setTimeout(() => {
                  document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
                }, 500);
              });
            break;

          case 'projects':
            typeText(outputLine, 'Accessing project database...')
              .then(() => {
                setTimeout(() => {
                  document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
                }, 500);
              });
            break;

          case 'skills':
            typeText(outputLine, 'Loading skill matrix...')
              .then(() => {
                setTimeout(() => {
                  document.getElementById('skills').scrollIntoView({ behavior: 'smooth' });
                }, 500);
              });
            break;

          case 'certifications':
            typeText(outputLine, 'Verifying digital credentials...')
              .then(() => {
                setTimeout(() => {
                  document.getElementById('certifications').scrollIntoView({ behavior: 'smooth' });
                }, 500);
              });
            break;

          case 'education':
            typeText(outputLine, 'Accessing educational records...')
              .then(() => {
                setTimeout(() => {
                  document.getElementById('education').scrollIntoView({ behavior: 'smooth' });
                }, 500);
              });
            break;

          case 'tryhackme':
            typeText(outputLine, 'Connecting to TryHackMe servers...')
              .then(() => {
                setTimeout(() => {
                  document.getElementById('tryhackme').scrollIntoView({ behavior: 'smooth' });
                }, 500);
              });
            break;

          case 'about':
            typeText(outputLine, 'Decrypting personal data...')
              .then(() => {
                setTimeout(() => {
                  document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
                }, 500);
              });
            break;

          case 'contact':
            typeText(outputLine, 'Establishing secure communication channels...')
              .then(() => {
                setTimeout(() => {
                  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                }, 500);
              });
            break;

          case 'github':
            typeText(outputLine, 'Opening encrypted tunnel to GitHub repository...\nSecurity level: AUTHORIZED')
              .then(() => {
                setTimeout(() => window.open('https://github.com/AlbedoAi', '_blank'), 1000);
              });
            break;

          case 'linkedin':
            typeText(outputLine, 'Connecting to professional network...\nStatus: SECURE CONNECTION ESTABLISHED')
              .then(() => {
                setTimeout(() => window.open('https://www.linkedin.com/in/shubham-raturi-797229288/', '_blank'), 1000);
              });
            break;

          case 'clear':
            // Remove all command history except header
            document.querySelectorAll('.command-history').forEach(el => {
              if (!el.closest('header')) {
                el.remove();
              }
            });
            outputDiv.remove(); // Remove this command too
            return; // Skip adding this command to history

          case 'date':
            typeText(outputLine, `SYSTEM DATE: ${new Date().toLocaleString()}\nSTATUS: SYNCED WITH NTP`);
            break;

          case 'matrix':
            typeText(outputLine, 'Toggling Matrix visual overlay...')
              .then(() => {
                toggleMatrixEffect();
              });
            break;

          case 'whoami':
            typeText(outputLine, 'USER: GUEST\nACCESS LEVEL: STANDARD\nSESSION: ENCRYPTED');
            break;

          case 'sudo':
            typeText(outputLine, 'PERMISSION DENIED: You require advanced clearance to use this command.\nSECURITY PROTOCOL: ACTIVATED')
              .then(() => {
                setTimeout(() => {
                  const glitchEffect = document.createElement('div');
                  glitchEffect.style.position = 'fixed';
                  glitchEffect.style.top = '0';
                  glitchEffect.style.left = '0';
                  glitchEffect.style.width = '100%';
                  glitchEffect.style.height = '100%';
                  glitchEffect.style.backgroundColor = 'rgba(255, 0, 255, 0.1)';
                  glitchEffect.style.zIndex = '9999';
                  glitchEffect.style.animation = 'glitch 0.3s linear forwards';
                  document.body.appendChild(glitchEffect);

                  setTimeout(() => {
                    document.body.removeChild(glitchEffect);
                  }, 300);
                }, 500);
              });
            break;

          default:
            typeText(outputLine, `ERROR: Command '${cmd}' not recognized.\nType 'help' for available commands.`);
        }
      }

    function adjustViewportForFixedTerminal() {
        const terminalHeight = document.querySelector('.terminal-input-container').offsetHeight;
        document.body.style.paddingBottom = (terminalHeight + 20) + 'px';
      }

    // Toggle matrix effect
    const toggleMatrixEffect = () => {
      const matrixEl = document.getElementById('matrix-canvas');
      if (matrixEl.style.opacity === '0') {
        matrixEl.style.opacity = '0.15';
      } else {
        matrixEl.style.opacity = '0';
      }
    };

    // Focus on input when clicking anywhere in the document
    document.addEventListener('click', () => {
      commandInput.focus();
    });

    // Initialize all the cyberpunk effects
    createMatrixRain();
    fadeInSections();
    initDecryptAnimation();
    updateSystemStats();

    // Add cyberpunk animated icons to the background
    const addCyberIcons = () => {
      const icons = ['◈', '◎', '◉', '▣', '▲', '►', '▼', '◄', '★', '✧'];
      const container = document.querySelector('body');

      for (let i = 0; i < 8; i++) {
        const icon = document.createElement('div');
        icon.className = 'cyber-icon';
        icon.textContent = icons[Math.floor(Math.random() * icons.length)];
        icon.style.top = `${Math.random() * 80 + 10}%`;
        icon.style.left = `${Math.random() * 80 + 10}%`;
        icon.style.fontSize = `${Math.random() * 2 + 1}rem`;
        icon.style.opacity = '0.15';
        icon.style.color = Math.random() > 0.5 ? 'var(--terminal-cyan)' : 'var(--terminal-magenta)';
        container.appendChild(icon);
      }
    };

    addCyberIcons();
    commandInput.focus();
    adjustViewportForFixedTerminal();
  });

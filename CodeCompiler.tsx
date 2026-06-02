import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  RotateCcw, 
  Download, 
  Code2, 
  Terminal as TerminalIcon, 
  ChevronDown, 
  Check, 
  Sliders, 
  Cpu, 
  Layers, 
  AlertCircle, 
  Maximize2, 
  TerminalSquare,
  Sparkles,
  Info,
  Copy
} from 'lucide-react';

// Default templates for languages
const CODE_TEMPLATES = {
  c: `/*
 * Khan Productions - Virtual Compiler Environment
 * Target: Standard C (GCC 11.2)
 */
#include <stdio.h>

int main() {
    // Standard standard output streams
    printf("Hello, Khan Productions!\\n");
    printf("Virtual Sandbox compiled successfully.\\n");
    return 0;
}`,
  cpp: `/*
 * Khan Productions - Virtual Compiler Environment
 * Target: C++20 (Clang 13.0)
 */
#include <iostream>
using namespace std;

int main() {
    // High-performance stream execution
    cout << "Hello, Khan Productions!" << endl;
    cout << "Ready for luxury cyber-dark computations." << endl;
    return 0;
}`,
  python: `# 
# Khan Productions - Virtual Compiler Environment
# Target: Python 3.10
#

def execute_sandbox():
    platform = "Khan Productions"
    print(f"Hello, {platform}!")
    print("Simulated standard output streams are active.")

if __name__ == "__main__":
    execute_sandbox()`,
  java: `/*
 * Khan Productions - Virtual Compiler Environment
 * Target: OpenJDK 17
 */
public class Main {
    public static void main(String[] args) {
        // Dynamic JVM execution trace
        System.out.println("Hello, Khan Productions!");
        System.out.println("Sandbox JVM initialized correctly.");
    }
}`,
  javascript: `/**
 * Khan Productions - Virtual Compiler Environment
 * Target: Node.js v18 (V8 Engine)
 */
function runVirtualEngine() {
    const platform = 'Khan Productions';
    console.log(\`Hello, \${platform}!\`);
    console.log("Interactive Javascript terminal online.");
}

runVirtualEngine();`
};

type LanguageKey = 'c' | 'cpp' | 'python' | 'java' | 'javascript';

const LANGUAGE_LABELS: Record<LanguageKey, string> = {
  c: 'C (GCC 11.2)',
  cpp: 'C++ (Clang 13.0)',
  python: 'Python (3.10.4)',
  java: 'Java (OpenJDK 17)',
  javascript: 'JavaScript (Node.js)'
};

const LANGUAGE_EXTENSIONS: Record<LanguageKey, string> = {
  c: 'c',
  cpp: 'cpp',
  python: 'py',
  java: 'java',
  javascript: 'js'
};

const CodeCompiler: React.FC = () => {
  const [language, setLanguage] = useState<LanguageKey>('javascript');
  const [code, setCode] = useState<string>(CODE_TEMPLATES.javascript);
  const [stdin, setStdin] = useState<string>('');
  const [showStdin, setShowStdin] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isCodeCopied, setIsCodeCopied] = useState<boolean>(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState<boolean>(false);
  
  
useEffect(() => {

  document.title = "Universal Code Compiler | Khan Productions";
  

  return () => {
    document.title = "Khan Productions";
  };
}, []);
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    'khan-os v2.4.1 (x86_64-pc-linux-gnu)',
    '* Virtual sandbox file structure initialized.',
    '* Premium Dark Compilation System is ONLINE.',
    '',
    'Press "Run Code" at the top to compile and execute your script.'
  ]);
  const [metrics, setMetrics] = useState<{
    time: string;
    memory: string;
    status: 'idle' | 'success' | 'error';
  }>({
    time: '—',
    memory: '—',
    status: 'idle'
  });
  
  const [compileProgress, setCompileProgress] = useState<number>(0);
  const [currentCompileStep, setCurrentCompileStep] = useState<string>('');

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync scroll of textarea and line numbers/syntax backdrop
  const handleScroll = () => {
    if (textareaRef.current && backdropRef.current) {
      backdropRef.current.scrollTop = textareaRef.current.scrollTop;
      backdropRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update code template when language changes
  const handleLanguageChange = (lang: LanguageKey) => {
    setLanguage(lang);
    setCode(CODE_TEMPLATES[lang]);
    setLangDropdownOpen(false);
    
    // Reset terminal metrics
    setMetrics({ time: '—', memory: '—', status: 'idle' });
    setTerminalHistory([
      `khan-os v2.4.1 (x86_64-pc-linux-gnu)`,
      `* Active environment switched to: ${LANGUAGE_LABELS[lang]}`,
      `* Virtual compiler pipeline ready.`,
      ``,
      `Press "Run Code" to execute script.`
    ]);
  };

  // Reset the editor canvas
  const handleResetCanvas = () => {
    setCode(CODE_TEMPLATES[language]);
    setMetrics({ time: '—', memory: '—', status: 'idle' });
    setTerminalHistory([
      `khan-os v2.4.1 (x86_64-pc-linux-gnu)`,
      `* Canvas reset triggered for ${LANGUAGE_LABELS[language]}.`,
      `* Code restored to starter template.`,
      ``,
      `Ready to compile.`
    ]);
  };

  // Download the current script
  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([code], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `script.${LANGUAGE_EXTENSIONS[language]}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Copy terminal output
  const handleCopyTerminal = () => {
    navigator.clipboard.writeText(terminalHistory.join('\n'));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Copy code from editor
  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setIsCodeCopied(true);
    setTimeout(() => setIsCodeCopied(false), 2000);
  };

  // Intercept Tab key in textarea to insert spaces
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newValue = code.substring(0, start) + "    " + code.substring(end);
      setCode(newValue);

      // Set cursor position after render
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 4;
        }
      }, 0);
    }
  };

  // Autoscroll terminal to bottom when history changes
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalHistory, isRunning]);

  // Execute Simulated Code Compilation
  const handleRunCode = () => {
    if (isRunning) return;

    setIsRunning(true);
    setCompileProgress(0);
    setMetrics({ time: '—', memory: '—', status: 'idle' });
    
    const steps = [
      { progress: 15, msg: 'Spawning sandboxed system container...' },
      { progress: 35, msg: 'Instantiating virtual AST representation tree...' },
      { progress: 55, msg: 'Validating safety permissions & sandbox boundaries...' },
      { progress: 75, msg: 'Compiling source objects to intermediate byte code...' },
      { progress: 95, msg: 'Linking runtime libraries and mounting input channels...' }
    ];

    let currentStepIdx = 0;
    
    // Set terminal into compilations loading mode
    setTerminalHistory([
      `[info] Initiating sandbox compiler pipelines for target ${LANGUAGE_LABELS[language]}...`,
      `[info] Custom stdin stream: ${showStdin && stdin.trim() ? `"${stdin}"` : 'Inactive (empty)'}`,
      `----------------------------------------------------`
    ]);

    const interval = setInterval(() => {
      if (currentStepIdx < steps.length) {
        const step = steps[currentStepIdx];
        setCompileProgress(step.progress);
        setCurrentCompileStep(step.msg);
        setTerminalHistory(prev => [...prev, `[compiling] ${step.msg}`]);
        currentStepIdx++;
      } else {
        clearInterval(interval);
        executeCodeFinalize();
      }
    }, 280);
  };

  // Compile finalization and smart-parsing execution
  const executeCodeFinalize = () => {
    setIsRunning(false);
    setCompileProgress(100);

    const generatedTime = (Math.random() * 0.14 + 0.08).toFixed(3);
    const generatedMemory = (Math.random() * 2.8 + 12.1).toFixed(1);

    // Smart parsing for high-end interaction:
    // We check if they wrote code for a different language than selected, to trigger smart compile errors!
    let detectedError = '';
    let parsedOutputs: string[] = [];

    const codeLower = code.toLowerCase();

    // 1. Cross-language syntax error detection (highly premium UX detail)
    if (language === 'python') {
      if (codeLower.includes('console.log(')) {
        detectedError = `Traceback (most recent call last):\n  File "main.py", line 8, in <module>\n    console.log(...)\nNameError: name 'console' is not defined. Did you mean 'print'?`;
      } else if (codeLower.includes('printf(') || codeLower.includes('std::cout')) {
        detectedError = `Traceback (most recent call last):\n  File "main.py", line 8, in <module>\n    printf(...)\nNameError: name 'printf' is not defined. Did you mean 'print'?`;
      } else if (codeLower.includes('public class ') || codeLower.includes('system.out.print')) {
        detectedError = `SyntaxError: invalid syntax (Detected Java boilerplate in Python pipeline)`;
      }
    } else if (language === 'javascript') {
      if (codeLower.includes('printf(') || codeLower.includes('std::cout') || codeLower.includes('cout <<')) {
        detectedError = `ReferenceError: printf is not defined (Cannot compile C/C++ syntax inside V8 engine)`;
      } else if (codeLower.includes('system.out.print')) {
        detectedError = `ReferenceError: System is not defined (Cannot resolve JVM commands inside Node.js pipeline)`;
      } else if (codeLower.includes('def ') && codeLower.includes(':') && !codeLower.includes('function')) {
        detectedError = `SyntaxError: Unexpected token 'def' (Detected Python syntax in JavaScript pipeline)`;
      }
    } else if (language === 'c' || language === 'cpp') {
      if (codeLower.includes('console.log(')) {
        detectedError = `main.${language}: In function 'int main()':\nmain.${language}:7:5: error: 'console' was not declared in this scope; did you mean 'printf'?`;
      } else if (codeLower.includes('system.out.print')) {
        detectedError = `main.${language}: In function 'int main()':\nmain.${language}:7:5: error: 'System' was not declared in this scope`;
      } else if (codeLower.includes('def ') && codeLower.includes(':')) {
        detectedError = `main.${language}:1:1: error: expected class-name or function-signature before 'def' token`;
      }
      
      if (language === 'c' && codeLower.includes('std::cout')) {
        detectedError = `main.c: In function 'main':\nmain.c:6:5: error: 'std' undeclared (C language does not support C++ namespaces)`;
      }
    } else if (language === 'java') {
      if (codeLower.includes('console.log(')) {
        detectedError = `Main.java:8: error: package console does not exist\n        console.log(...);\n               ^`;
      } else if (codeLower.includes('cout <<') || codeLower.includes('std::cout')) {
        detectedError = `Main.java:8: error: cannot find symbol\n  symbol:   variable cout\n  location: class Main`;
      } else if (codeLower.includes('def ') && codeLower.includes(':')) {
        detectedError = `Main.java:1: error: class, interface, enum, or record expected\n  def void main()...`;
      }
    }

    // 2. Parsed standard stdout extractor
    if (!detectedError) {
      // Look for standard prints to extract them!
      const lines = code.split('\n');
      
      lines.forEach(line => {
        const trimmed = line.trim();
        // Match string literals in standard print hooks
        let matchedStr: string | null = null;

        if (language === 'python') {
          const match = trimmed.match(/print\s*\(\s*(f?["'])(.*?)\1\s*\)/);
          if (match) matchedStr = match[2];
        } else if (language === 'javascript') {
          const match = trimmed.match(/console\.log\s*\(\s*(["'`])(.*?)\1\s*\)/);
          if (match) matchedStr = match[2];
        } else if (language === 'c') {
          const match = trimmed.match(/printf\s*\(\s*"(.*?)"\s*(?:,\s*.*)?\)/);
          if (match) matchedStr = match[1];
        } else if (language === 'cpp') {
          const match = trimmed.match(/cout\s*<<\s*"(.*?)"/);
          if (match) matchedStr = match[1];
        } else if (language === 'java') {
          const match = trimmed.match(/System\.out\.print(?:ln)?\s*\(\s*"(.*?)"\s*\)/);
          if (match) matchedStr = match[1];
        }

        if (matchedStr !== null) {
          // Format escaped newline codes if any
          const cleanStr = matchedStr
            .replace(/\\n/g, '')
            .replace(/\\t/g, '    ')
            .replace(/\$\{platform\}|\+platform\+/g, 'Khan Productions')
            .replace(/\{name\}|\+name\+/g, 'Developer');
          parsedOutputs.push(cleanStr);
        }
      });

      // Include stdin integration into stdout to make it ultra realistic!
      if (showStdin && stdin.trim()) {
        parsedOutputs.push(`[stdin feed] Connected input buffer: "${stdin}"`);
        parsedOutputs.push(`[stdin feed] Script successfully loaded buffer streams.`);
      }

      // Default backfill if no prints were matched
      if (parsedOutputs.length === 0) {
        parsedOutputs.push(`Hello, Khan Productions!`);
        parsedOutputs.push(`(Simulated script executed successfully with no custom standard output logged)`);
      }
    }

    // 3. Assemble and render results
    setTimeout(() => {
      if (detectedError) {
        setTerminalHistory([
          `[SYSTEM] Spawning container context: OK`,
          `[COMPILER] Compilation error encountered. Aborting run.`,
          `----------------------------------------------------`,
          `\x1b[31m${detectedError}\x1b[0m`, // Simulated color flag
          ``,
          `>>> Process exited with Status Code: 1 (Compilation Failed)`
        ]);
        setMetrics({
          time: '0.002s',
          memory: '4.1 MB',
          status: 'error'
        });
      } else {
        setTerminalHistory([
          `[SYSTEM] Spawning container context: OK`,
          `[COMPILER] Static verification check: Success`,
          `[RUNTIME] Attaching execution frames...`,
          `----------------------------------------------------`,
          ...parsedOutputs.map(out => `\x1b[32m${out}\x1b[0m`),
          ``,
          `>>> Process exited successfully with Status Code: 0`
        ]);
        setMetrics({
          time: `${generatedTime}s`,
          memory: `${generatedMemory} MB`,
          status: 'success'
        });
      }
    }, 100);
  };

  // Simple token highlighter component to render dynamic keywords, variables and strings
  const getHighlightedCode = () => {
    // Simple HTML escaper
    let escaped = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Style replacements:
    // Keywords
    const keywordsJS = /\b(const|let|var|function|return|if|else|for|while|class|import|export|default|new|typeof|instanceof)\b/g;
    const keywordsPY = /\b(def|class|import|from|return|if|else|elif|for|while|in|as|None|True|False|is|lambda|not|and|or)\b/g;
    const keywordsC = /\b(int|float|double|char|void|if|else|for|while|return|class|public|private|protected|static|import|include|struct|using|namespace)\b/g;

    const activeKeywords = language === 'javascript' ? keywordsJS : (language === 'python' ? keywordsPY : keywordsC);

    escaped = escaped.replace(activeKeywords, '<span class="tok-keyword" style="color: #a78bfa; font-weight: 600;">$&</span>');

    // Strings
    escaped = escaped.replace(/(["'`])(.*?)\1/g, '<span class="tok-string" style="color: #34d399;">$&</span>');

    // Comments
    if (language === 'python') {
      escaped = escaped.replace(/(#.*)/g, '<span class="tok-comment" style="color: #64748b; font-style: italic;">$&</span>');
    } else {
      escaped = escaped.replace(/(\/\/.*|\/\*[\s\S]*?\*\/)/g, '<span class="tok-comment" style="color: #64748b; font-style: italic;">$&</span>');
    }

    // Builtins and methods
    const builtins = /\b(print|printf|cout|console|log|System|out|println|main)\b/g;
    escaped = escaped.replace(builtins, '<span class="tok-builtin" style="color: #22d3ee;">$&</span>');

    // Numbers
    escaped = escaped.replace(/\b(\d+)\b/g, '<span class="tok-number" style="color: #fb7185;">$&</span>');

    return { __html: escaped };
  };

  const codeLines = code.split('\n');

  return (
    <div className="khan-compiler-container min-h-screen bg-[#0a0a0f] text-slate-100 flex flex-col items-center justify-start p-4 md:p-8 font-sans selection:bg-purple-500/30">
      
      {/* Dynamic CSS Styling Injection - Self Contained Premium Cyber-Dark Visual Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Inter:wght@300;400;500;600;700&display=swap');
        
        .khan-compiler-container {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          background-image: 
            radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.05) 0%, transparent 40%),
            radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.03) 0%, transparent 40%),
            linear-gradient(rgba(255, 255, 255, 0.003) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.003) 1px, transparent 1px);
          background-size: 100% 100%, 100% 100%, 24px 24px, 24px 24px;
        }

        .cyber-card {
          background: rgba(17, 17, 24, 0.7);
          backdrop-filter: blur(12px);
          border: 1px solid #2a2a3a;
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .cyber-card:hover {
          border-color: rgba(139, 92, 246, 0.4);
          box-shadow: 0 8px 32px 0 rgba(139, 92, 246, 0.05);
        }

        .glow-button {
          position: relative;
          background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 0 15px rgba(139, 92, 246, 0.3);
        }

        .glow-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 0 25px rgba(139, 92, 246, 0.6);
        }

        .glow-button:active {
          transform: translateY(1px);
        }

        /* Scrollbar customizing */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #0d0d12;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #232332;
          border-radius: 4px;
          border: 2px solid #0d0d12;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #8b5cf6;
        }

        /* Custom glow pulsing keyframes */
        @keyframes cyber-pulse {
          0%, 100% { border-color: #2a2a3a; }
          50% { border-color: rgba(139, 92, 246, 0.6); }
        }

        .editor-focused {
          animation: cyber-pulse 2s infinite ease-in-out;
        }

        /* Synced text properties */
        .editor-text-style {
          font-family: 'Fira Code', 'Courier New', monospace;
          font-size: 13.5px;
          line-height: 22px;
          letter-spacing: -0.01em;
        }
      `}} />

      {/* Main Grid Wrapper */}
      <div className="w-full max-w-7xl flex flex-col gap-6">
        
        {/* Brand Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2a2a3a]/60 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-purple-500/10 to-indigo-500/5 border border-purple-500/30 rounded-xl relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <TerminalSquare className="w-6 h-6 text-purple-400 relative z-10" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-purple-400">Digital Engine</span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                Khan Productions <span className="text-slate-400 font-normal">Code Sandbox</span>
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-xs text-slate-400 bg-[#111118] px-4 py-2 border border-[#2a2a3a] rounded-lg">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Premium Virtual Compiler v2.4.1</span>
          </div>
        </header>

        {/* WORKSPACE HEADER SUB-BAR */}
        <section className="cyber-card p-3 rounded-xl flex flex-wrap items-center justify-between gap-3 bg-[#111118]/80">
          
          {/* Language Dropdown Selector */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center justify-between gap-3 bg-[#0d0d12] hover:bg-[#151522] border border-[#2a2a3a] text-slate-200 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all w-[185px] text-left group"
            >
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                <span>{LANGUAGE_LABELS[language].split(' ')[0]}</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {langDropdownOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-[200px] bg-[#0d0d12] border border-[#2a2a3a] rounded-lg shadow-2xl z-50 overflow-hidden backdrop-blur-xl">
                <div className="p-1.5 flex flex-col gap-0.5">
                  {(Object.keys(LANGUAGE_LABELS) as LanguageKey[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={`flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-all ${
                        language === lang
                          ? 'bg-purple-600/20 text-purple-300 border border-purple-500/20'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/40 border border-transparent'
                      }`}
                    >
                      <span>{LANGUAGE_LABELS[lang]}</span>
                      {language === lang && <Check className="w-3.5 h-3.5 text-purple-400" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action buttons panel */}
          <div className="flex items-center gap-2">
            
            {/* RESET CANVAS BUTTON */}
            <button
              onClick={handleResetCanvas}
              title="Reset code canvas to default template"
              className="flex items-center gap-2 bg-[#0d0d12] hover:bg-red-500/10 border border-[#2a2a3a] hover:border-red-500/30 text-slate-300 hover:text-red-400 px-3.5 py-2 rounded-lg text-xs font-medium transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Canvas</span>
            </button>

            {/* DOWNLOAD BUTTON */}
            <button
              onClick={handleDownload}
              title="Download source code script file"
              className="flex items-center gap-2 bg-[#0d0d12] hover:bg-[#151522] border border-[#2a2a3a] hover:border-purple-500/30 text-slate-300 hover:text-purple-300 px-3.5 py-2 rounded-lg text-xs font-medium transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download .{LANGUAGE_EXTENSIONS[language]}</span>
            </button>

            <div className="h-6 w-px bg-[#2a2a3a] mx-1 hidden sm:block" />

            {/* RUN CODE BUTTON */}
            <button
              onClick={handleRunCode}
              disabled={isRunning}
              className={`glow-button px-5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 text-white ${
                isRunning ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              <Play className={`w-3.5 h-3.5 fill-current ${isRunning ? 'animate-pulse' : ''}`} />
              <span>{isRunning ? 'Compiling...' : 'Run Code'}</span>
            </button>

          </div>
        </section>

        {/* TWO-COLUMN DASHBOARD SPLIT */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

          {/* LEFT COLUMN: CODE EDITOR WORKSPACE */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            <div className="cyber-card rounded-xl overflow-hidden flex flex-col bg-[#111118]/60 relative border border-[#2a2a3a]">
              
              {/* Editor Top Bar Controls */}
              <div className="flex items-center justify-between border-b border-[#2a2a3a] px-4 py-3 bg-[#0d0d12]/90">
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <div className="h-4 w-px bg-[#2a2a3a] mx-1" />
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Source Code</span>
                    <span className="text-[10px] bg-purple-500/10 text-purple-300 border border-purple-500/20 px-2 py-0.5 rounded">
                      `workspace_main.${LANGUAGE_EXTENSIONS[language]}`
                    </span>
                  </div>
                </div>

                {/* Quick copy code */}
                <button
                  onClick={handleCopyCode}
                  className="p-1.5 bg-[#171724] hover:bg-purple-500/10 hover:text-purple-300 text-slate-500 rounded border border-[#2a2a3a] transition-all cursor-pointer"
                  title="Copy current workspace code"
                >
                  {isCodeCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Editor Sandbox Area */}
              <div className="relative flex overflow-auto h-[480px] bg-[#07070a] border-b border-[#2a2a3a]">
                
                {/* Gutter / Line numbers rail */}
                <div className="select-none text-right pr-3 pl-4 py-4 bg-[#0a0a0f] text-slate-600 border-r border-[#2a2a3a]/80 sticky left-0 z-10 flex flex-col justify-start">
                  {codeLines.map((_, idx) => (
                    <span 
                      key={idx} 
                      className="block editor-text-style text-[11px] h-[22px] font-mono leading-[22px] text-slate-600 hover:text-purple-400/70 transition-colors"
                    >
                      {idx + 1}
                    </span>
                  ))}
                </div>

                {/* Overlaid Highlight Backdrop */}
                <div 
                  ref={backdropRef}
                  className="absolute inset-0 left-[48px] right-0 pointer-events-none p-4 overflow-hidden whitespace-pre editor-text-style text-slate-300 z-0 select-none bg-transparent"
                  dangerouslySetInnerHTML={getHighlightedCode()}
                />

                {/* Real Interactive Textarea */}
                <textarea
                  ref={textareaRef}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onScroll={handleScroll}
                  onKeyDown={handleKeyDown}
                  spellCheck={false}
                  placeholder="// Type or paste your premium compiler code here..."
                  className="flex-1 ml-[48px] bg-transparent text-transparent caret-purple-400 p-4 editor-text-style focus:outline-none resize-none whitespace-pre overflow-auto z-10 w-full h-full relative"
                  style={{ 
                    fontFamily: "'Fira Code', 'Courier New', monospace",
                    WebkitTextFillColor: 'transparent'
                  }}
                />

              </div>

              {/* Editor Workspace Status bar footer */}
              <div className="bg-[#0a0a0f] px-4 py-2 border-t border-[#2a2a3a]/60 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <div className="flex items-center gap-4">
                  <span>Lines: {codeLines.length}</span>
                  <span>Size: {new Blob([code]).size} Bytes</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-pulse" />
                  <span>UTF-8 Space Standard</span>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: LINUX/UBUNTU STYLE OBSIDIAN TERMINAL */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Terminal Main Container */}
            <div className="cyber-card rounded-xl overflow-hidden flex flex-col bg-[#07070b] border border-[#2a2a3a] h-[370px] relative">
              
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between border-b border-[#2a2a3a] px-4 py-2.5 bg-[#0e0e14]">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 cursor-pointer" title="Kill Terminal Frame" onClick={handleResetCanvas} />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <div className="h-4 w-px bg-[#2a2a3a] mx-1" />
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono font-medium">
                    <TerminalIcon className="w-3.5 h-3.5 text-purple-400" />
                    <span>bash - khan_compiler</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Clipboard copy output */}
                  <button
                    onClick={handleCopyTerminal}
                    className="p-1 bg-[#171724]/60 hover:bg-[#1c1c2b] text-slate-500 hover:text-white rounded border border-[#2a2a3a] transition-all"
                    title="Copy terminal outputs buffer"
                  >
                    {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                  <button className="p-1 bg-[#171724]/60 text-slate-600 rounded border border-[#2a2a3a] hover:text-white">
                    <Maximize2 className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Terminal Shell Body */}
              <div className="flex-1 p-4 overflow-y-auto font-mono text-[12.5px] leading-relaxed text-slate-300 bg-[#060609] relative flex flex-col justify-start">
                
                {/* Standard Terminal Output Loop */}
                <div className="flex flex-col gap-1 w-full z-10">
                  {terminalHistory.map((line, index) => {
                    // Check text formatting codes
                    let lineClass = "text-slate-300";
                    let content = line;

                    if (line.startsWith('[compiling]')) {
                      lineClass = "text-purple-400/80 animate-pulse";
                    } else if (line.startsWith('[info]')) {
                      lineClass = "text-cyan-400/90";
                    } else if (line.startsWith('\x1b[31m')) {
                      lineClass = "text-red-400 border-l-2 border-red-500 pl-2 py-1 my-1 bg-red-950/20";
                      content = line.replace(/\x1b\[31m|\x1b\[0m/g, '');
                    } else if (line.startsWith('\x1b[32m')) {
                      lineClass = "text-emerald-400 font-semibold";
                      content = line.replace(/\x1b\[32m|\x1b\[0m/g, '');
                    } else if (line.startsWith('>>>')) {
                      lineClass = "text-slate-500 font-bold border-t border-[#2a2a3a] pt-1 mt-2";
                    }

                    return (
                      <div key={index} className={`whitespace-pre-wrap ${lineClass}`}>
                        {content}
                      </div>
                    );
                  })}
                  
                  {/* Active Loading HUD Overlay for Compilation phase */}
                  {isRunning && (
                    <div className="absolute inset-0 bg-[#07070b]/95 backdrop-blur-sm flex flex-col items-center justify-center gap-4 z-20 transition-opacity">
                      <div className="relative flex items-center justify-center">
                        <div className="absolute w-14 h-14 rounded-full border border-purple-500/20 animate-ping" />
                        <div className="absolute w-10 h-10 rounded-full border-t border-r border-purple-500 animate-spin" />
                        <Layers className="w-5 h-5 text-purple-400 relative z-10" />
                      </div>
                      
                      <div className="flex flex-col items-center text-center">
                        <span className="text-xs font-semibold text-purple-300 uppercase tracking-widest animate-pulse">Compiling source trees</span>
                        <span className="text-[11px] text-slate-500 font-mono mt-1 max-w-[280px] truncate">{currentCompileStep}</span>
                      </div>

                      {/* Compilation HUD progress line */}
                      <div className="w-[180px] bg-slate-900 h-1 rounded-full overflow-hidden border border-[#2a2a3a]">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full transition-all duration-300"
                          style={{ width: `${compileProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div ref={terminalEndRef} />
                </div>
              </div>

              {/* Execution Status Panel HUD metrics */}
              <div className="border-t border-[#2a2a3a] bg-[#0d0d12] px-4 py-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-purple-400" />
                  <span className="font-semibold text-slate-400">Sandbox Metrics:</span>
                </div>
                
                <div className="flex items-center gap-4 font-mono text-[11px]">
                  <div className="flex items-center gap-1 bg-[#151522] border border-[#2a2a3a] px-2 py-0.5 rounded">
                    <span className="text-slate-500">Time:</span>
                    <span className="text-purple-300 font-medium">{metrics.time}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-[#151522] border border-[#2a2a3a] px-2 py-0.5 rounded">
                    <span className="text-slate-500">VM Mem:</span>
                    <span className="text-purple-300 font-medium">{metrics.memory}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <span className="text-slate-500">Status:</span>
                    {metrics.status === 'success' ? (
                      <span className="text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">SUCCESS</span>
                    ) : metrics.status === 'error' ? (
                      <span className="text-red-400 font-bold bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded">FAILED</span>
                    ) : (
                      <span className="text-slate-400 font-bold bg-slate-800/40 border border-transparent px-2 py-0.5 rounded">IDLE</span>
                    )}
                  </div>
                </div>
              </div>

            </div>

            {/* INTERACTIVE CUSTOM INPUT PANEL (stdin) */}
            <div className="cyber-card rounded-xl overflow-hidden bg-[#111118]/60 flex flex-col border border-[#2a2a3a]">
              
              {/* stdin header bar */}
              <button
                onClick={() => setShowStdin(!showStdin)}
                className="flex items-center justify-between w-full px-4 py-3 bg-[#0d0d12] hover:bg-[#151522] text-left transition-all border-b border-[#2a2a3a] group cursor-pointer"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 tracking-wide uppercase">
                  <Sliders className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                  <span>Provide Custom Input (stdin)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded border transition-all ${
                    showStdin 
                      ? 'bg-purple-500/10 border-purple-500/20 text-purple-300' 
                      : 'bg-[#1a1a26]/40 border-[#2a2a3a] text-slate-500'
                  }`}>
                    {showStdin ? 'ACTIVE' : 'EXPAND'}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-300 ${showStdin ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {/* stdin body container */}
              <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                showStdin ? 'max-h-[140px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
              }`}>
                <div className="p-3 bg-[#07070b]">
                  <textarea
                    value={stdin}
                    onChange={(e) => setStdin(e.target.value)}
                    placeholder="Provide standard inputs (stdin) for virtual scripts buffer here..."
                    className="w-full h-20 bg-[#0d0d12] hover:bg-[#11111a] focus:bg-[#0e0e14] text-slate-200 border border-[#2a2a3a] focus:border-purple-500/50 p-2.5 rounded-lg font-mono text-xs focus:outline-none resize-none placeholder-slate-600 transition-all focus:ring-1 focus:ring-purple-500/20"
                  />
                  <div className="flex items-center gap-1.5 mt-2 text-[10px] text-slate-500 font-mono">
                    <Info className="w-3 h-3 text-purple-500" />
                    <span>Inputs will be streamed into code arrays on compilation.</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </section>

      </div>
    </div>
  );
};

export default CodeCompiler;

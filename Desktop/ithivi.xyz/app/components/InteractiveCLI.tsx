'use client';

import React, { useState } from 'react';

export const InteractiveCLI: React.FC = () => {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<string[]>([
    'VAPOR-OS [Version 2026.09.29]',
    'Type "help" or "cat resume" to execute lab commands.'
  ]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    let response = '';

    switch (cmd) {
      case 'help':
        response = 'Available commands: cat resume, get projects, cook --build, clear';
        break;
      case 'cat resume':
        response = 'Thiviyanath Maheswaran | Software Engineer & Full Stack Developer | Contact: thiviyanath15@gmail.com | Site: ithivi.xyz';
        break;
      case 'get projects':
        response = 'Batches available: 1. AI DevSecOps Tool | 2. NeuroTouch AI | 3. Cats vs Dogs CNN | 4. Odoo ERP System';
        break;
      case 'cook --build':
        response = '[SUCCESS] Automated deployment pipeline triggered. Product purity: 99.99%. Zero vulnerabilities detected.';
        break;
      case 'clear':
        setLogs([]);
        setInput('');
        return;
      default:
        response = `Command not recognized: "${cmd}". Type "help" for a list of available commands.`;
    }

    setLogs((prev) => [...prev, `> ${input}`, response]);
    setInput('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8 bg-black/90 border border-emerald-500/40 rounded-lg p-4 font-mono text-sm text-emerald-400 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-emerald-500/20 text-xs text-gray-400">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
          <span className="ml-2 font-bold text-emerald-500">LAB-TERMINAL // THIVIYANATH-SE</span>
        </div>
        <span>STATUS: 99.99% PURE</span>
      </div>
      
      <div className="h-48 overflow-y-auto space-y-1 pr-2 mb-3">
        {logs.map((log, idx) => (
          <div key={idx} className={log.startsWith('>') ? 'text-yellow-400' : 'text-emerald-300/90'}>
            {log}
          </div>
        ))}
      </div>

      <form onSubmit={handleCommand} className="flex items-center">
        <span className="text-yellow-400 mr-2">$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a command (e.g. 'cat resume')..."
          className="w-full bg-transparent border-none outline-none text-emerald-400 font-mono placeholder-emerald-700 focus:ring-0"
        />
      </form>
    </div>
  );
};
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SAMPLE_VULNERABILITIES = [
  {
    name: 'Exposed AWS API Secret Key',
    code: `import boto3\n\n# HARDCODED SECRET KEY DETECTED\nAWS_ACCESS_KEY = "AKIAIOSFODNN7EXAMPLE"\nAWS_SECRET_KEY = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"\n\ndef connect_s3():\n    client = boto3.client('s3', aws_access_key_id=AWS_ACCESS_KEY, aws_secret_access_key=AWS_SECRET_KEY)\n    return client.list_buckets()`,
    vulnType: 'OWASP A07:2021 - Identification & Authentication Failures',
    patch: `import os\nimport boto3\n\n# SECURED: Extracted secrets to environment variables\nAWS_ACCESS_KEY = os.getenv("AWS_ACCESS_KEY_ID")\nAWS_SECRET_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")\n\ndef connect_s3():\n    if not AWS_ACCESS_KEY or not AWS_SECRET_KEY:\n        raise ValueError("Missing AWS Credentials in environment variables.")\n    client = boto3.client('s3')\n    return client.list_buckets()`
  },
  {
    name: 'SQL Injection Hazard',
    code: `import sqlite3\n\ndef get_user_data(username):\n    conn = sqlite3.connect('users.db')\n    cursor = conn.cursor()\n    # CRITICAL: Dynamic string formatting query\n    query = f"SELECT * FROM users WHERE username = '{username}'"\n    cursor.execute(query)\n    return cursor.fetchall()`,
    vulnType: 'OWASP A03:2021 - Injection Vector',
    patch: `import sqlite3\n\ndef get_user_data(username):\n    conn = sqlite3.connect('users.db')\n    cursor = conn.cursor()\n    # SECURED: Parameterized SQL Query prevents SQL Injection\n    query = "SELECT * FROM users WHERE username = ?"\n    cursor.execute(query, (username,))\n    return cursor.fetchall()`
  }
];

export function AIPatchSimulator() {
  const [selectedSample, setSelectedSample] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisLogs, setAnalysisLogs] = useState<string[]>([]);
  const [isPatched, setIsPatched] = useState(false);

  const runAIAudit = () => {
    setIsAnalyzing(true);
    setIsPatched(false);
    setAnalysisLogs([]);

    const sample = SAMPLE_VULNERABILITIES[selectedSample];

    const logSteps = [
      '[AST ENGINE] Parsing Abstract Syntax Tree...',
      `[CRITICAL DETECTED] Triggered security rule: ${sample.vulnType}`,
      '[GEMINI LLM AGENT] Initializing security patch reasoning pipeline...',
      '[REFACTORING] Rewriting AST nodes to inject secure programming paradigms...',
      '[VERIFICATION] Running zero-vulnerability audit test suite...',
      '[SUCCESS] Security patch generated successfully! Product purity: 99.99%'
    ];

    logSteps.forEach((step, index) => {
      setTimeout(() => {
        setAnalysisLogs((prev) => [...prev, step]);
        if (index === logSteps.length - 1) {
          setIsAnalyzing(false);
          setIsPatched(true);
        }
      }, (index + 1) * 600);
    });
  };

  return (
    <div className="border border-emerald-500/40 bg-black/90 rounded-2xl p-6 md:p-8 font-mono text-white shadow-[0_0_35px_rgba(16,185,129,0.15)] my-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center pb-4 border-b border-emerald-500/20 mb-6 gap-2">
        <div>
          <span className="text-emerald-400 text-[10px] tracking-widest uppercase">// INTERACTIVE DEMO</span>
          <h3 className="text-xl md:text-2xl font-bold text-white">AI Agent Security Patch Engine</h3>
        </div>
        <span className="text-xs text-yellow-400 bg-yellow-950/30 border border-yellow-500/30 px-3 py-1 rounded-full self-start md:self-auto">
          Gemini LLM + AST Integration
        </span>
      </div>

      {/* Code Sample Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {SAMPLE_VULNERABILITIES.map((sample, idx) => (
          <button
            key={idx}
            onClick={() => {
              setSelectedSample(idx);
              setIsPatched(false);
              setAnalysisLogs([]);
            }}
            className={`px-3 py-1.5 rounded text-xs transition-all border ${
              selectedSample === idx
                ? 'bg-emerald-500 text-black border-emerald-400 font-bold'
                : 'bg-black/60 text-emerald-400/80 border-emerald-500/30 hover:border-emerald-400'
            }`}
          >
            {sample.name}
          </button>
        ))}
      </div>

      {/* Split Code Workbench */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Source Code */}
        <div className="bg-black/80 border border-red-500/30 rounded-xl p-4">
          <div className="flex justify-between items-center pb-2 mb-3 border-b border-red-500/20 text-xs text-red-400 font-bold">
            <span>// TARGET CODE (VULNERABLE)</span>
            <span className="text-[10px] bg-red-950/40 text-red-300 px-2 py-0.5 rounded border border-red-500/30">
              UNSECURED AST
            </span>
          </div>
          <pre className="text-[11px] text-gray-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
            {SAMPLE_VULNERABILITIES[selectedSample].code}
          </pre>
        </div>

        {/* AI Output Patch */}
        <div className="bg-black/80 border border-emerald-500/30 rounded-xl p-4">
          <div className="flex justify-between items-center pb-2 mb-3 border-b border-emerald-500/20 text-xs text-emerald-400 font-bold">
            <span>// REFACTORED CODE (AI SECURED)</span>
            <span className="text-[10px] bg-emerald-950/40 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
              {isPatched ? '100% SECURE' : 'AWAITING AUDIT'}
            </span>
          </div>
          <pre className={`text-[11px] overflow-x-auto whitespace-pre-wrap leading-relaxed transition-opacity duration-300 ${isPatched ? 'text-emerald-300' : 'text-gray-600'}`}>
            {isPatched ? SAMPLE_VULNERABILITIES[selectedSample].patch : '# Run AI Audit to generate secure code refactor patch...'}
          </pre>
        </div>
      </div>

      {/* Live AI Reasoning Stream */}
      <AnimatePresence>
        {analysisLogs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-black border border-emerald-500/30 rounded-xl p-4 text-[11px] text-emerald-400 mb-6 space-y-1.5"
          >
            <div className="text-gray-500 border-b border-emerald-500/20 pb-1 mb-2 font-bold flex justify-between">
              <span>// GEMINI REASONING PIPELINE</span>
              {isAnalyzing && <span className="text-yellow-400 animate-pulse">EXECUTING REFACTOR...</span>}
            </div>
            {analysisLogs.map((log, i) => (
              <p key={i} className={log.includes('[CRITICAL') ? 'text-yellow-400 font-bold' : log.includes('[SUCCESS]') ? 'text-emerald-400 font-bold' : 'text-emerald-300/90'}>
                {log}
              </p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Trigger Button */}
      <button
        onClick={runAIAudit}
        disabled={isAnalyzing}
        className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-lg ${
          isAnalyzing
            ? 'bg-emerald-950 text-emerald-500 border border-emerald-500/30 cursor-not-allowed'
            : 'bg-emerald-500 text-black hover:bg-emerald-400 hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]'
        }`}
      >
        {isAnalyzing ? 'RUNNING AST SECURITY ANALYSIS...' : 'TRIGGER AI GEMINI AUDIT & AUTO-PATCH'}
      </button>
    </div>
  );
}
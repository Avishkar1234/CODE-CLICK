'use client';

import { useCodeEditorStore } from '@/store/useCodeEditorStore';
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Copy,
  Terminal,
} from 'lucide-react';
import React, { useState } from 'react';
import RunningCodeSkeleton from './RunningCodeSkeleton';

function OutputPanel() {
  const { output, error, isRunning } = useCodeEditorStore();
  const [isCopied, setIsCopied] = useState(false);

  const hasContent = error || output;

  // 🔥 Detect production limitation error
  const isProductionError =
    typeof error === 'string' &&
    error.includes('Code execution is not available');

  const handleCopy = async () => {
    if (!hasContent) return;
    await navigator.clipboard.writeText(error || output);
    setIsCopied(true);

    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative bg-[#181825] rounded-xl p-4 ring-1 ring-gray-800/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#1e1e2e] ring-1 ring-gray-800/50">
            <Terminal className="w-4 h-4 text-blue-400" />
          </div>
          <span className="text-sm font-medium text-gray-300">Output</span>
        </div>

        {hasContent && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-gray-400 hover:text-gray-300 bg-[#1e1e2e] 
            rounded-lg ring-1 ring-gray-800/50 hover:ring-gray-700/50 transition-all"
          >
            {isCopied ? (
              <>
                <CheckCircle className="w-3.5 h-3.5" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy
              </>
            )}
          </button>
        )}
      </div>

      {/* Output Area */}
      <div className="relative">
        <div
          className="relative bg-[#1e1e2e]/50 backdrop-blur-sm border border-[#313244] 
        rounded-xl p-4 h-[600px] overflow-auto font-mono text-sm"
        >
          {isRunning ? (
            <RunningCodeSkeleton />
          ) : error ? (
            <div className="space-y-4">
              {/* Error Header */}
              <div className="flex items-start gap-3 text-red-400">
                <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-1" />
                <div className="space-y-1">
                  <div className="font-medium">Execution Error</div>

                  {/* Show raw error ONLY if not production */}
                  {!isProductionError && (
                    <pre className="whitespace-pre-wrap text-red-400/80">
                      {error}
                    </pre>
                  )}
                </div>
              </div>

              {/* Production message */}
              {isProductionError && (
                <div className="flex items-start gap-3 bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 text-blue-400">
                  <div className="space-y-1 text-xs">
                    <p className="font-medium text-blue-300">
                      Running locally? Code execution works out of the box.
                    </p>
                    <p className="text-blue-400/70">
                      This live demo does not support code execution as it
                      requires a self-hosted execution engine. Clone the repo
                      and run it locally with Docker to use this feature.
                    </p>

                    <a
                      href="https://github.com/Avishkar1234/CODE-CLICK"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-1 text-blue-400 underline hover:text-blue-300 transition-colors"
                    >
                      View setup instructions →
                    </a>
                  </div>
                </div>
              )}
            </div>
          ) : output ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 mb-3">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Execution Successful</span>
              </div>
              <pre className="whitespace-pre-wrap text-gray-300">{output}</pre>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-500">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-800/50 ring-1 ring-gray-700/50 mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <p className="text-center">
                Run your code to see the output here...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OutputPanel;

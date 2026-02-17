"use client";
import React, { useState, ChangeEvent } from 'react';
import { FileText, Clock, Hash, AlertCircle, UploadCloud, Trash2 } from 'lucide-react';
import mammoth from 'mammoth';

export default function WordCounter() {
  const [text, setText] = useState('');
  const [duplicates, setDuplicates] = useState<{ word: string; count: number }[]>([]);

  const wordsArray = text.trim().toLowerCase().split(/\s+/).filter(w => w.length > 0);
  const wordCount = wordsArray.length;
  const readingTime = Math.ceil(wordCount / 200);

  const checkDuplicates = (content: string) => {
    const words = content.trim().toLowerCase().split(/\s+/).filter(w => w.length > 2);
    const freqMap: { [key: string]: number } = {};
    words.forEach(w => freqMap[w] = (freqMap[w] || 0) + 1);

    const sorted = Object.entries(freqMap)
      .filter(([_, count]) => count > 2)
      .sort((a, b) => b[1] - a[1])
      .map(([word, count]) => ({ word, count }));
    setDuplicates(sorted);
  };

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.name.endsWith('.docx')) {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      updateTextAndStats(result.value);
    } else if (file.name.endsWith('.txt')) {
      const content = await file.text();
      updateTextAndStats(content);
    }
  };

  const updateTextAndStats = (newText: string) => {
    setText(newText);
    checkDuplicates(newText);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        {/* ヘッダー */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
            Lexi<span className="text-blue-600">Scan</span>
          </h1>
          <p className="text-slate-500">Sophisticated Word Counter for Researchers</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左側：メインエディタ */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              {/* ファイルアップロード・エリア */}
              <label className="flex items-center justify-center w-full p-4 border-b border-slate-100 bg-slate-50/50 hover:bg-blue-50 transition-colors cursor-pointer group">
                <UploadCloud className="w-5 h-5 mr-2 text-slate-400 group-hover:text-blue-500" />
                <span className="text-sm text-slate-500 group-hover:text-blue-600 font-medium">Click to upload .txt or .docx</span>
                <input type="file" className="hidden" accept=".txt,.docx" onChange={handleFileUpload} />
              </label>

              <textarea
                className="w-full h-[500px] p-6 focus:outline-none resize-none text-lg leading-relaxed"
                placeholder="Start typing or paste your research draft here..."
                value={text}
                onChange={(e) => updateTextAndStats(e.target.value)}
              />
              
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between">
                <button onClick={() => updateTextAndStats('')} className="text-slate-400 hover:text-red-500 transition-colors flex items-center text-sm">
                  <Trash2 className="w-4 h-4 mr-1" /> Clear Text
                </button>
                <span className="text-xs text-slate-400 font-mono italic">Writing in progress...</span>
              </div>
            </div>
          </div>

          {/* 右側：統計・分析サイドバー */}
          <div className="space-y-6">
            {/* 統計カード */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 border-b pb-2">Analysis</h2>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-slate-600"><Hash className="w-5 h-5 mr-3 text-blue-500" /> Words</div>
                <div className="text-2xl font-bold">{wordCount}</div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-slate-600"><FileText className="w-5 h-5 mr-3 text-emerald-500" /> Characters</div>
                <div className="text-2xl font-bold">{text.length}</div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-slate-600"><Clock className="w-5 h-5 mr-3 text-orange-500" /> Reading Time</div>
                <div className="text-2xl font-bold text-slate-800">{readingTime} <span className="text-sm font-normal text-slate-400">min</span></div>
              </div>
            </div>

            {/* 重複チェックカード */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-center mb-4">
                <AlertCircle className="w-5 h-5 mr-2 text-blue-500" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">Redundancy Check</h2>
              </div>
              
              {duplicates.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {duplicates.slice(0, 12).map((item) => (
                    <div key={item.word} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold border border-blue-100">
                      {item.word} <span className="ml-1 text-blue-400 bg-white px-1.5 rounded-full">{item.count}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-400 italic">No significant duplicates found yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

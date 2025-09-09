// WASM module types and wrapper
export interface SearchResult {
  title: string;
  url: string;
  body: string;
}

let wasmModule: any = null;

export async function initTinySearch(): Promise<void> {
  if (wasmModule) return; // Already initialized

  try {
    // Load the WASM module from the public directory
    const moduleUrl = new URL('/tinysearch_engine.js', window.location.origin);
    const module = await import(moduleUrl.href);
    await module.default('/tinysearch_engine_bg.wasm'); // Initialize WASM with WASM file path
    wasmModule = module;
  } catch (error) {
    console.error('Failed to initialize TinySearch WASM:', error);
    throw error;
  }
}

export function search(query: string, numResults: number = 5): SearchResult[] {
  if (!wasmModule) {
    throw new Error('TinySearch not initialized. Call initTinySearch() first.');
  }

  try {
    return wasmModule.search(query, numResults);
  } catch (error) {
    console.error('TinySearch search failed:', error);
    return [];
  }
}

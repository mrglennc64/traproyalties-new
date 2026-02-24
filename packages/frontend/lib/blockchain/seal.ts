interface SealOptions {
  documentName: string;
  caseNumber?: string;
  timestamp: string;
  generator: string;
}

interface SealResult {
  success: boolean;
  documentHash?: string;
  transactionHash?: string;
  blockNumber?: number;
  timestamp?: Date;
  error?: string;
}

// Mock blockchain seal service for development/demo
export const blockchainSeal = {
  sealDocument: async (content: string, options: SealOptions): Promise<SealResult> => {
    // Simulate blockchain delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate mock blockchain data
    const mockHash = '0x' + Array.from({ length: 64 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join('');

    const mockTxHash = '0x' + Array.from({ length: 64 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join('');

    return {
      success: true,
      documentHash: mockHash,
      transactionHash: mockTxHash,
      blockNumber: Math.floor(Math.random() * 1000000) + 20000000,
      timestamp: new Date(),
    };
  }
};

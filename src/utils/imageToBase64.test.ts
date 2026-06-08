import { describe, it, expect, vi } from 'vitest';

import imageToBase64 from './imageToBase64';

describe('imageToBase64', () => {
  it('converts a file to base64 string', async () => {
    const file = new File(['hello'], 'test.png', { type: 'image/png' });
    const result = await imageToBase64(file);
    expect(typeof result).toBe('string');
    expect(result.startsWith('data:image/png;base64,')).toBe(true);
  });

  it('rejects on FileReader error', async () => {
    const file = new File([''], 'test.png', { type: 'image/png' });

    const OriginalFileReader = globalThis.FileReader;

    class MockFileReader {
      onerror:
        | ((this: FileReader, ev: ProgressEvent<FileReader>) => void)
        | null = null;
      onload:
        | ((this: FileReader, ev: ProgressEvent<FileReader>) => void)
        | null = null;
      result: string | null = null;

      readAsDataURL(): void {
        setTimeout(() => {
          if (this.onerror) {
            this.onerror.call(
              this as unknown as FileReader,
              {} as ProgressEvent<FileReader>
            );
          }
        }, 0);
      }
    }

    vi.stubGlobal('FileReader', MockFileReader);

    await expect(imageToBase64(file)).rejects.toThrow('Failed to read file');

    vi.stubGlobal('FileReader', OriginalFileReader);
  });
});

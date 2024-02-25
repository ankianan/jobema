import path from 'path';
import { fileURLToPath } from 'url';

export default {
  entry: './ui/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'dist'),
  },
  mode: 'development',
  watch: true
};
import { scanFiles } from '@/utils/utils';

console.log(scanFiles(require.context('./ja/', true, /\.ts$/)));

export default scanFiles(require.context('./ja/', true, /\.ts$/));

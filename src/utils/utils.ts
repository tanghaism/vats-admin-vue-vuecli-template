// 读取文件
export function scanFiles(ctx: any, fileExt = 'ts', returnType: 'object' | 'array' = 'object') {
  const reg = new RegExp('\\.' + fileExt + '$', 'gim');
  if (returnType === 'object') {
    const map: any = {};
    for (const key of ctx.keys()) {
      const keyArr = key.split('/');
      keyArr.shift(); // 移除.
      map[keyArr.join('.').replace(reg, '')] = ctx(key).default as never;
    }
    return map;
  } else if (returnType === 'array') {
    const map: any = [];
    for (const key of ctx.keys()) {
      map.push(...ctx(key).default);
    }
    return map;
  }
}

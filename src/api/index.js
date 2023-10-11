const context = require.context('./modules', false, /\.js$/);
const modules = {};

context.keys().forEach(key => {
    // 获取读取到的文件名字并且截取
    const fileName = key.slice(2, -3);
    //通过 context(key)导出文件内容
    const fileModule = context(key).default;
    modules[fileName] = {
        ...fileModule,
    };
});

export default modules
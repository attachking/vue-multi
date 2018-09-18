// 自定义插件，用于在各个html模板中插入公共部分
function MyPlugin(options) {
  // Configure your plugin with options...
}

MyPlugin.prototype.apply = function (compiler) {
  compiler.plugin('compilation', (compilation) => {
    compilation.plugin(
      'html-webpack-plugin-before-html-processing',
      (data, cb) => {
        let keywords = data.outputName === 'newsDetail.html' ? '' : '<meta name="keywords" content="河南招才引智创新发展大会，招才引智大会，河南高端人才引进，招才引智官网，郑州招才引智">\n<meta name="description" content="河南招才引智创新发展大会河南省政府举办的高规格大规模的招才引智活动，是贯彻落实习近平新时代中国特色社会主义思想和党的十九大精神的重大举措，聚焦“广聚天下英才，让中原更加出彩”主题，注重宣传展示河南形象、吸引集聚高端人才、搭好招才引智平台、深化合作促进发展，建立长效机制，推动招才引智常态化www.zghnrc.gov.cn">'
        data.html = data.html.replace(/(<\/head>)/, `
<meta name="viewport" content="width=device-width,initial-scale=1.0">
${keywords}
<script>
  (function() {
    var loc = location.href;
    if (/^https/.test(loc)) {
      location.href = loc.replace(/https/, 'http');
    }
  }());
</script>
<script>
  var _hmt = _hmt || [];
  (function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?d4e5465994c71094655dc127da401670";
    var s = document.getElementsByTagName("script")[0]; 
    s.parentNode.insertBefore(hm, s);
  })();
</script>$1`)
        cb(null, data)
      }
    )
  })
}

module.exports = MyPlugin

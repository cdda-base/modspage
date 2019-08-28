var mods = null;
var pagemax = 32;//考虑根据不同设备调整？
//加载页面
function LoadMods(pageindex) {
	$(".Mods").empty();
	$("#changepage").empty();
	var modindex = pageindex * pagemax;
	for (var i = modindex; i < (modindex + pagemax < mods.length ? modindex + pagemax : mods.length); i++) {
		var mod = mods[i];
		var content = "<div class=\"Mod\">";

		content += "<div class='container'>"
		content += "<div class='title'>"
		content += "<h2 class=''>" + mod.modname + "</h2>"
		// content += "<i class='fa fa-envelope'></i>"
		content += "</div>"
		content += "<div class='subtitle'>"

		content += "<div class='fl'>"

		content += "<div class='ic'>"
		content += "<div class='e'>"
		for (var j = 0; j < mod.tags.length; j++) {
			content += "<p class=\"tag\">";
			content += mod.tags[j] + "";
			content += "</p>";
		}

		content += "</div>"
		content += "</div>"
		content += "</div>"
		content += "<div class='am fr'>"

		content += "<div class=\"author\" id=\"" + i + "\">";
		content += "<i class='fa fa-user'></i>"
		content += mod.author
		content += " </div>"

		content += "<p class=\"Modver\">" + "版本：" + mod.ver + "</p>";
		content += "</div>"
		content += "</div>"
		content += "</div>"

		content += '<hr>'





		//获取作者信息
		LoadAuthorInfo(mod.author, i);


		content += "<div class='e'>"
		content += "<p class=\"Msg\">" + mod.info + "</p>";

		if (mod.warning != undefined) {
			content += "<p class=\"warning\">" + mod.warning + "</p>";
		}
		content += "<div class='footer'>"

		content += "<a class=\"download\" href=\"" + mod.addr + "\">"
		content += "<i class='fa fa-download'></i>"
		content += "下载</a>"
		content += "</div>"
		content += "</div>"
		content += "</div>"

		$(".Mods").append(content);

	}
	//添加换页
	$("#changepage").append("<p>现在是第" + (pageindex + 1) + "页，共" + Math.ceil(mods.length / pagemax) + "页</p>")
	if (pageindex == 0) {
		$("#changepage").append("<a href=\"#header\" onClick=\"LoadMods(" + (pageindex + 1) + ")\">下一页</a>");
	} else if (modindex + pagemax >= mods.length) {//当到了最后一页
		$("#changepage").append("<a href=\"#header\" onClick=\"LoadMods(" + (pageindex - 1) + ")\">上一页</a>");
	} else {
		$("#changepage").append("<a href=\"#header\" onClick=\"LoadMods(" + (pageindex - 1) + ")\">上一页</a>");
		$("#changepage").append("<a href=\"#header\" onClick=\"LoadMods(" + (pageindex + 1) + ")\">下一页</a>");
	}
}
function LoadAuthorInfo(name, id) {
	$.getJSON("../../authors/" + name + ".json", function (data) {
		if (data.email != undefined) {
			$("#" + id).append("<i class='fa fa-envelope'></i>" + data.email);
		}

	});
}
//加载信息
$.getJSON("../../mods-cn/modsinfo.json", function (data) {
	mods = data;
	LoadMods(0);
});

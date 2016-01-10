const gui = require("nw.gui");

const win = gui.Window.get();

if (process.platform === "darwin")
{
	var mb = new gui.Menu(
	{
		type: "menubar"
	});
	mb.createMacBuiltin("Marknote");
	win.menu = mb;
}

win.focus();

const Configstore = require('configstore');
const pkg = require('./package.json');

const conf = new Configstore(pkg.name);

var editor, autoSaveTimer;

const timeStamp = getTimestamp();

window.startup = function()
{
	editor = ace.edit("editor");
	
	if (conf.get(timeStamp))
	{
		editor.setValue(conf.get(timeStamp));
	}
	else 
	{
		editor.setValue("# " + getTimestamp() + "\n\n");
	}

		editor.clearSelection();
		editor.focus();

	autoSaveTimer = setInterval(autoSave, 10000);
};

function autoSave()
{
	conf.set(timeStamp, editor.getValue());
}

function getTimestamp()
{
	var d = new Date();
	
	//getMonth() starts at 0, so we need to add 1.
	return (d.getMonth() + 1) + "." + d.getDate() + "." + d.getFullYear();
}
// ==PREPROCESSOR==
// @import "%fb2k_path%skins\Kanon\jscript\Playcount Sync\common.js"
// @import "%fb2k_path%skins\Kanon\jscript\Playcount Sync\tooltip_buttons.js"
// @name "Playcount Sync"
// @author "marc2003"
// ==/PREPROCESSOR==

var bw = 32;
var bh = 32;
var top_margin = 0;
var left_margin = 0;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var script_name = "Playcount Sync";
var selection_mode = 1;
var username_file = settings_path + "username";
var username = read(username_file);
var api_key_file = settings_path + "api_key";
var api_key = read(api_key_file);
var sql_file = data_folder + "test.sql";
var loved_working = null;
var playcount_working = null;
var page = 0;
var last_page = 0;
var auto_correct = window.GetProperty("auto_correct", true);
var auto_love = window.GetProperty("auto_love", false);
var auto_love_tf = window.GetProperty("auto_love_tf", "");
var bg = window.GetProperty("bg", 102);
var custom_background = window.GetProperty("custom_background", "");
var show_Console = window.GetProperty("show_Console", true);
if (!g_metadb) Buttons = {
	but: new Button(left_margin, top_margin, bw, bh, {
		normal: images_path + "exclamation.png"
	}, null, "No selection")
};
var g_timer = window.SetInterval(function() {
	var temp = page > 1 ? page - 1 : 1;
	if (loved_working && page == last_page) {
		xmlhttp.abort();
		sync_library_loved(temp);
	} else if (playcount_working && page == last_page) {
		xmlhttp.abort();
		sync_library_playcount(temp);
	} else {
		last_page = page;
	}
}, 15000);

if (fb.IsPlaying) on_playback_new_track();
else on_item_focus_change();

function on_metadb_changed() {
	if (!g_metadb) return;
	artist = fb.TitleFormat("%artist%").EvalWithMetadb(g_metadb);
	track = fb.TitleFormat("%title%").EvalWithMetadb(g_metadb);
	old_userloved = fb.TitleFormat("%LASTFM_LOVED_DB%").EvalWithMetadb(g_metadb) == 1 ? 1 : 0;
	old_userplaycount = fb.TitleFormat("%LASTFM_PLAYCOUNT_DB%").EvalWithMetadb(g_metadb);
	command = "Last.fm " + (old_userloved == 1 ? "Unlove" : "Love") + " Track '" + track + "' by '" + artist + "'";
	crc32 = fb.TitleFormat("$crc32($lower(%artist%%title%))").EvalWithMetadb(g_metadb);
	switch (true) {
		case !utils.CheckComponent("foo_customdb", true):
			n = "exclamation.png";
			h = "exclamation.png";
			tooltip = "The foo_customdb component is not installed. Please refer to the readme.";
			func = null;
			break;
		case username.length == 0:
		case api_key.length != 32:
			n = "exclamation.png";
			h = "exclamation.png";
			tooltip = "Please use the context menu to set your Last.fm username and API KEY.";
			func = null;
			break;
		case !utils.CheckComponent("foo_softplaylists", true):
			n = "exclamation.png";
			h = "exclamation.png";
			tooltip = "The foo_softplaylists component is required to love tracks.";
			func = null;
			break;
		default:
			n = old_userloved == 1 ? "love_h.png" : "love.png";
			h = old_userloved == 1 ? "love.png" : "love_h.png";
			tooltip = command;
			func = function() {
				lfm_track();
			}
			break;
	}
	Buttons = {
		but: new Button(left_margin, top_margin, bw, bh, {
			normal: images_path + n,
			hover: images_path + h
		}, func, tooltip)
	};
	window.Repaint();
}

function on_size() {
	ww = window.Width;
	wh = window.Height;
}

function on_paint(gr) {
	buttons_background(gr);
	buttonsDraw(gr);
}

function on_notify_data(name, data) {
	if (name == "lastfm_update" && data == 1) {
		username = read(username_file);
		api_key = read(api_key_file);
		on_metadb_changed();
		loved_working = null;
		playcount_working = null;
	}
}

function on_playback_new_track() {
	time_elapsed = 0;
	switch (true) {
		case fb.PlaybackLength == 0:
			target_time = 240;
			break;
		case fb.PlaybackLength >= 30:
			target_time = Math.min(Math.floor(fb.PlaybackLength / 2), 240);
			break;
		default:
			target_time = 5;
			break;
	}
	on_item_focus_change();
}

function on_playback_time(time) {
	time_elapsed++;
	if (time_elapsed == 3 && auto_love && fb.TitleFormat(auto_love_tf).Eval() == 1 && old_userloved == 0) {
		fb.trace(script_name + ": Automatically loving this track....");
		lfm_track();
	}
	if (time_elapsed == target_time) sync();
}

function lfm_track() {
	fb.RunContextCommandWithMetadb(command, g_metadb, 8);
	sync();
}

function sync() {
	switch (true) {
		case loved_working || playcount_working:
			return;
		case !utils.CheckComponent("foo_customdb", true):
			fb.trace(script_name + ": Not contacting Last.fm. foo_customdb is missing.");
			return;
		default:
			fb.trace(script_name + ": Contacting Last.fm....");
			lastfm("&method=track.getinfo&artist=" + encodeURIComponent(artist) + "&track=" + encodeURIComponent(track) + "&autocorrect=" + (auto_correct ? 1 : 0), "foo_playcount_sync", function() {
				process();
			});
	}
}

function tf(value) {
	value = value.replace(/'/g, "''");
	value = value.replace(/,/g, "','");
	value = value.replace(/\//g, "'/'");
	value = value.replace(/\(/g, "'('");
	value = value.replace(/\)/g, "')'");
	value = value.replace(/\[/g, "'['");
	return (value.replace(/\]/g, "']'"));
}

function process() {
	parsed_data = JSON.parse(xmlhttp.responsetext);
	if (parsed_data.error > 0) {
		if (parsed_data.error == 6) fb.trace(script_name + ": artist / track not found.");
		else fb.trace(script_name + ": " + xmlhttp.responsetext);
		return;
	}
	fb.trace(script_name + ": Last.fm responded 'OK'");
	userplaycount = parsed_data.track.userplaycount > 0 ? ++parsed_data.track.userplaycount : 1;
	userloved = parsed_data.track.userloved == 1 ? 1 : 0;
	if (fb.IsPlaying && time_elapsed >= target_time && fb.PlaybackLength > 29 && fb.PlaybackLength < 10800) {
		switch (true) {
			case userplaycount < old_userplaycount:
				fb.trace(script_name + ": Playcount returned from Last.fm is lower than current value. Not updating.");
				break;
			case old_userplaycount == userplaycount:
				fb.trace(script_name + ": No changes found. Not updating.");
				break;
			default:
				fb.RunContextCommandWithMetadb("Customdb Delete Playcount", g_metadb, 8);
				if (old_userloved == 1) fb.RunContextCommandWithMetadb("Customdb Love 0", g_metadb, 8);
				var attempt = 0;
				while (fb.TitleFormat("%LASTFM_PLAYCOUNT_DB%").EvalWithMetadb(g_metadb) != userplaycount && attempt <= 3) {
					var query1 = '\"INSERT INTO quicktag(url,subsong,fieldname,value) VALUES(\\"' + crc32 + '\\",\\"-1\\",\\"LASTFM_PLAYCOUNT_DB\\",\\"' + userplaycount + '\\")\";';
					WshShell.Run("\"" + script_path + "sqlite3.exe" + "\"  \"" + fb.ProfilePath + "customdb_sqlite.db" + "\" " + query1, 0, true);
					attempt++;
				}
				fb.RunContextCommandWithMetadb("Customdb Refresh", g_metadb, 8);
				break;
		}
	}
	if (old_userloved != userloved) fb.RunContextCommandWithMetadb("Customdb Love " + userloved, g_metadb, 8);
}

function sync_library_loved(p) {
	if (loved_working == null) return (fb.trace(script_name + ": Import aborted."));
	page = p;
	lastfm("&method=user.getlovedtracks&limit=200&user=" + username + "&page=" + page, "foo_playcount_sync", function() {
		process_library_loved();
	});
}

function process_library_loved() {
	parsed_data = JSON.parse(xmlhttp.responsetext);
	if (parsed_data.error > 0) {
		loved_working = null;
		fb.ShowPopupMessage("There is a problem with the Last.fm web services. Please try again later.\n\n" + xmlhttp.responsetext, script_name);
		return;
	}
	if (page == 1) {
		try {
			pages = parsed_data.lovedtracks["@attr"].totalPages;
		} catch (e) {}
	}
	if (pages > 0 && xmlhttp.responsetext.indexOf('{"lovedtracks":') == 0) {
		for (i = 0; i < parsed_data.lovedtracks.track.length; i++) {
			try {
				var data = [];
				data[0] = parsed_data.lovedtracks.track[i].artist.name;
				data[1] = parsed_data.lovedtracks.track[i].name;
				data[2] = 1;
				if (data.length == 3) {
					fb.trace(r + ": " + data[0] + " - " + data[1]);
					url = fb.TitleFormat("$crc32($lower(" + tf(data[0]) + tf(data[1]) + "))").EvalWithMetadb(g_metadb);
					sql += 'INSERT OR REPLACE INTO quicktag(url,subsong,fieldname,value) VALUES("' + url + '","-1","LASTFM_LOVED_DB","' + data[2] + '");' + "\n";
					r++;
				}
			} catch (e) {
				errors++;
			}
		}
		fb.trace("Completed page " + page + " of " + pages + " (loved tracks)");
	} else {
		loved_page_errors++;
	}
	if (page < pages) {
		page++;
		sync_library_loved(page);
	} else {
		loved_working = null;
		playcount_working = true;
		pages = 0;
		r = 1;
		sync_library_playcount(1);
	}
}

function sync_library_playcount(p) {
	if (playcount_working == null) return (fb.trace(script_name + ": Import aborted."));
	page = p;
	lastfm("&method=user.getTopTracks&limit=100&user=" + username + "&page=" + page, "foo_playcount_sync", function() {
		process_library_playcount();
	});
}

function process_library_playcount() {
	parsed_data = JSON.parse(xmlhttp.responsetext);
	if (parsed_data.error > 0) {
		playcount_working = null;
		fb.ShowPopupMessage("There is a problem with the Last.fm web services. Please try again later.\n\n" + xmlhttp.responsetext, script_name);
		return;
	}
	if (page == 1) {
		try {
			pages = parsed_data.toptracks["@attr"].totalPages;
		} catch (e) {}
	}
	if (pages > 0 && xmlhttp.responsetext.indexOf('{"toptracks":') == 0) {
		for (i = 0; i < parsed_data.toptracks.track.length; i++) {
			try {
				var data = [];
				data[0] = parsed_data.toptracks.track[i].artist.name;
				data[1] = parsed_data.toptracks.track[i].name;
				data[2] = parsed_data.toptracks.track[i].playcount;
				if (data.length == 3 && data[2] > 0) {
					fb.trace(r + ": " + data[0] + " - " + data[1] + " " + data[2]);
					url = fb.TitleFormat("$crc32($lower(" + tf(data[0]) + tf(data[1]) + "))").EvalWithMetadb(g_metadb);
					sql += 'INSERT OR REPLACE INTO quicktag(url,subsong,fieldname,value) VALUES("' + url + '","-1","LASTFM_PLAYCOUNT_DB","' + data[2] + '");' + "\n";
					r++;
				}
			} catch (e) {
				errors++;
			}
		}
		fb.trace("Completed page " + page + " of " + pages + " (playcount)");
	} else {
		playcount_page_errors++;
	}
	if (page < pages) {
		page++;
		sync_library_playcount(page);
	} else {
		try {
			sql += "COMMIT;"
			ts = fso.OpenTextFile(sql_file, 2, true, 0);
			ts.WriteLine(sql);
			ts.close();
			import_sql();
		} catch (e) {}
		playcount_working = null;
		fb.trace("Loved track page errors: " + loved_page_errors + " (200 records are lost for every page that fails.)");
		fb.trace("Playcount page errors: " + playcount_page_errors + " (100 records are lost for every page that fails.)");
		fb.trace("Individual errors: " + errors);
	}
}

function import_sql() {
	try {
		cmd_file = fso.GetFile(script_path + "lastfm_sql.cmd").ShortPath;
		db_file = fso.GetFile(fb.ProfilePath + "customdb_sqlite.db").ShortPath;
		WshShell.Run("\"" + cmd_file + "\" \"" + fso.GetFile(script_path + "sqlite3.exe").ShortPath + "\" \"" + db_file + "\" \"" + fso.GetFile(sql_file).ShortPath + "\"");
	} catch (e) {}
}

function on_mouse_move(x, y) {
	buttonsMove(x, y);
}

function on_mouse_lbtn_up(x, y) {
	buttonsUp(x, y);
}

function on_mouse_leave() {
	buttonsLeave();
}

function on_mouse_rbtn_up(x, y) {
	var _menu = window.CreatePopupMenu();
	var _li = window.CreatePopupMenu();
	var _au = window.CreatePopupMenu();
	var _child = window.CreatePopupMenu();
	var _auto = window.CreatePopupMenu();
	var idx;
	_li.AppendMenuItem(utils.CheckComponent("foo_customdb", true) && !loved_working && !playcount_working && g_metadb && username.length > 0 && api_key.length == 32 ? MF_STRING : MF_GRAYED, 4, "Create and import SQL file");
	_li.AppendMenuItem(utils.CheckComponent("foo_customdb", true) && fso.FileExists(sql_file) ? MF_STRING : MF_GRAYED, 5, "Import SQL file");
	_li.AppendMenuSeparator();
	_li.AppendMenuItem(MF_STRING, 7, "Show Console");
	_li.CheckMenuItem(7, show_Console);
	_li.AppendTo(_menu, MF_STRING, "Library import");
	_au.AppendMenuItem(MF_STRING, 6, "Use Last.fm auto-correct");
	_au.CheckMenuItem(6, auto_correct);
	_au.AppendTo(_menu, MF_STRING, "Auto-updates");
	_menu.AppendMenuSeparator();
	_auto.AppendMenuItem(MF_STRING, 200, "Off");
	_auto.AppendMenuItem(MF_STRING, 201, "On");
	_auto.CheckMenuRadioItem(200, 201, auto_love ? 201 : 200);
	_auto.AppendMenuSeparator();
	_auto.AppendMenuItem(auto_love ? MF_STRING : MF_GRAYED, 202, "Condition");
	_auto.AppendTo(_menu, MF_STRING, "Automatically love tracks");
	_menu.AppendMenuSeparator();
	if (!dui) _child.AppendMenuItem(MF_STRING, 101, "None");
	_child.AppendMenuItem(MF_STRING, 102, (dui ? "Default UI " : "Columns UI ") + "default");
	_child.AppendMenuItem(MF_STRING, 103, "Splitter");
	_child.AppendMenuItem(MF_STRING, 104, "Custom ");
	_child.AppendMenuSeparator();
	_child.AppendMenuItem(bg == 104 ? MF_STRING : MF_GRAYED, 105, "Set custom colour...");
	_child.CheckMenuRadioItem(101, 104, bg);
	_child.AppendTo(_menu, MF_STRING, "Background");
	_menu.AppendMenuSeparator();
	_menu.AppendMenuItem(username.length > 0 ? MF_STRING : MF_GRAYED, 1, "Visit your Last.fm user profile page");
	_menu.AppendMenuSeparator();
	_menu.AppendMenuItem(!loved_working && !playcount_working ? MF_STRING : MF_GRAYED, 2, "Set your Last.fm username...");
	_menu.AppendMenuItem(!loved_working && !playcount_working ? MF_STRING : MF_GRAYED, 3, "Set your API KEY...");
	_menu.AppendMenuSeparator();
	if (utils.IsKeyPressed(0x10)) _menu.AppendMenuItem(MF_STRING, 9, "Properties");
	_menu.AppendMenuItem(MF_STRING, 10, "Configure...");
	idx = _menu.TrackPopupMenu(x, y);
	switch (idx) {
		case 1:
			try {
				WshShell.run("http://www.last.fm/user/" + encodeURIComponent(username));
			} catch (e) {
				MsgBox("Unable to launch your default browser.", 0, script_name);
			}
			break;
		case 2:
			set_username();
			on_metadb_changed();
			break;
		case 3:
			set_api_key();
			on_metadb_changed();
			break;
		case 4:
			if (show_Console) fb.ShowConsole();
			loved_page_errors = 0;
			playcount_page_errors = 0;
			errors = 0;
			pages = 0;
			r = 1;
			sql = "BEGIN TRANSACTION;\n";
			loved_working = true;
			sync_library_loved(1);
			break;
		case 5:
			import_sql();
			break;
		case 6:
			auto_correct = !auto_correct;
			window.SetProperty("auto_correct", auto_correct);
			break;
		case 7:
			show_Console = !show_Console;
			window.SetProperty("show_Console", show_Console);
			break;
		case 101:
		case 102:
		case 103:
		case 104:
			bg = idx;
			window.SetProperty("bg", bg);
			window.Repaint();
			break;
		case 105:
			set_custom_background();
			break;
		case 200:
		case 201:
			auto_love = idx == 200 ? false : true;
			window.SetProperty("auto_love", auto_love);
			break;
		case 202:
			var new_auto_love_tf = InputBox("The result of the title formatting set here must equal 1 for a track to be automatically loved.\n\nExample:\n\n$ifequal(%rating%,5,1,0)", script_name, auto_love_tf);
			auto_love_tf = new_auto_love_tf;
			window.SetProperty("auto_love_tf", auto_love_tf);
			break;
		case 9:
			window.ShowProperties();
			break;
		case 10:
			window.ShowConfigure();
			break;
	}
	_menu;
	_auto;
	_li;
	_au;
	_child;
	return true;
}
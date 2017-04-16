<?php
header('Access-Control-Allow-Origin: *');

$servername = "localhost";
$studentid = "enabler_lab";
$dbname = "enabler_lab";
$password = "2eZyvxbNwl";

// Create connection
$db = new mysqli($servername, $studentid, $password, $dbname);
if ($db->connect_error) {
	die("api is not ready to use");
	//die("Connection failed: " . $conn->connect_error);
} else {
	$db->set_charset("utf8");
}
$path = trim($_GET['path'],"/");
$method = strtoupper($_SERVER['REQUEST_METHOD']);
parse_str(file_get_contents('php://input'), $input);

// ===== SIGN UP
if($method == 'POST' && $path == 'signup') {
    $data = clean($_POST);
	$data['password'] = password_hash($data['password'],PASSWORD_BCRYPT);
	$sql = "INSERT INTO users SET email='".$data['email']."', password='".$data['password']."', fname='".$data['fname']."', lname='".$data['lname']."'  ;";
	if($db->query($sql)) {
		echo json_encode(['success' => true, 'error'=>null]);
	} else {
		echo json_encode(['success' => false, 'error'=>1]);
	}
// ===== Check if Email is available
} else if($method == 'POST' && $path == 'emailavailable') {
    $data = clean($_POST);
    $sql = "SELECT ID FROM users WHERE email LIKE '".$data['email']."' LIMIT 1;";
    $result = $db->query($sql);
    if ($result->num_rows > 0) {
        echo json_encode(['available' => false]);
    } else {
        echo json_encode(['available' => true]);
    }
// ===== Sign in     
} else if($method == 'POST' && $path == 'signin') { 
    $data = clean($_POST);
	$back = ['success'=>false,'error'=>0];

	$sql = "SELECT is_active, ID, password FROM users WHERE email LIKE '".$data['email']."' LIMIT 1;";
    $result = $db->query($sql);
    if ($result->num_rows > 0) {
		while($r = $result->fetch_assoc()) {
			if($r['is_active'] == 0) {
				$back = ['success'=>false,'error'=>3];
			} else if(password_verify($data['password'], $r['password'])) {
				$rand = randToken(32);
				$db->query("UPDATE users SET token = '".$rand."' WHERE ID = ".$r['ID'].";");
				$_SESSION["userid"] = $r['ID'];
				$back = ['success'=>true,'error'=>null, "token"=>$rand];
			} else {
				$back = ['success'=>false,'error'=>2];
			}
		}
	} else {
		$back = ['success'=>false,'error'=>1];
    }
	echo json_encode($back);

// ===== Sign out
} else if($method == 'POST' && $path == 'signout') {
    $data = clean($_POST);
    $t = $db->query("UPDATE users SET token = '".$rand."' WHERE token = '".$data['token']."';");
	echo json_encode(['success' => $t]);

// ===== Check if loggedIn
} else if($method == 'GET' && $path == 'isloggedin') {
    $t = false;
    if(isset($_SESSION["userid"]) && intval($_SESSION["userid"]) > 0) {
		$t = true;
	}
    echo json_encode(['success' => $t]);

// ===== Get Loggedin User Info
} else if($method == 'POST' && $path == 'userdata') {
    $data = clean($_POST);
    $t = false;
	$sql = "SELECT fname, lname, email, is_active FROM users WHERE token = '".$data["token"]."' LIMIT 1;";
	$result = $db->query($sql);
	if ($result->num_rows > 0) {
		while($r = $result->fetch_assoc()) {
			$t = $r;
		}
	}
    echo json_encode(['user' => $t]);

// ===== Edit Info
} else if($method == 'POST' && $path == 'editinfo') {
    $data = clean($_POST);
    $t = false;
	$q = ["token = '".$data["token"]."'"];
	if(isset($data["fname"])) {
		$q[] = "fname='".$data["fname"]."'";
	}
	if(isset($data["lname"])) {
		$q[] = "lname='".$data["lname"]."'";
	}
	if(isset($data["password"])) {
		$data['password'] = password_hash($data['password'],PASSWORD_BCRYPT);	
		$q[] = "password='".$data["password"]."'";
	}
	$sql = "UPDATE users SET ".implode(",",$q)." WHERE token = '".$data["token"]."' LIMIT 1;";
	$result = $db->query($sql);
	if ($db->affected_rows) {
		 $t = true;
	}
	echo json_encode(['success' => $t]);

// ===== Add Project
} else if($method == 'POST' && $path == 'newproject') {
	vlog("\n\nPOST /newproject");
	$data = clean($_POST);
	$sql = "SELECT ID FROM users WHERE token LIKE '".$data['token']."' LIMIT 1;";
	vlog($sql);
	
	$result = $db->query($sql);
	if ($result->num_rows > 0) {
		vlog("USER FOUND");
		while($u = $result->fetch_assoc()) {
			vlog("Process request");
			$data['gallery'] = json_encode($data['gallery']);
			$sql = "INSERT INTO  projects (`name` ,`url` ,`detail` ,`user_id` ,`gallery`) VALUES ('".$data['name']."',  '".$data['url']."',  '".$data['detail']."',  '".$u['ID']."',  '".$data['gallery']."');";
			vlog($sql);
			if($db->query($sql)) {
				vlog("ADD SUCCESS");
				echo json_encode(['success' => true, 'error'=>null, 'project_id' => $db->insert_id]);
			} else {
				vlog("ERROR ADD :: ".$db->error);		
				echo json_encode(['success' => false, 'error'=>1]);
			}
		}
	} else {
		vlog("USER NOT FOUND 401");
		http_response_code(401);
	}

// ===== Check duplicated Project URL
} else if($method == 'POST' && $path == 'projectavailable') {
	vlog("\n\nPOST /projectavailable");
	$data = clean($_POST);
	$sql = "SELECT ID FROM projects WHERE url LIKE '".$data['url']."' LIMIT 1;";
	vlog($sql);
	$result = $db->query($sql);
	if ($result->num_rows > 0) {
		vlog("Available");
        echo json_encode(['available' => false]);
    } else {
		vlog("Duplicated");
        echo json_encode(['available' => true]);
    }


// ===== Check if Project Owner
} else if($method == 'POST' && $path == 'isowner') {
	vlog("\n\nPOST /isowner");
	$data = clean($_POST);
	$sql = "SELECT ID FROM users WHERE token LIKE '".$data['token']."' LIMIT 1;";
	vlog($sql);
	
	$result = $db->query($sql);
	if ($result->num_rows > 0) {
		vlog("USER FOUND");
		while($u = $result->fetch_assoc()) {
			vlog("Check Project");		
			$sql = "SELECT ID FROM projects WHERE user_id = ".$u['ID']." AND ID = ".$data['project_id']." LIMIT 1;";
			vlog($sql);
			$results = $db->query($sql);
			if ($results->num_rows > 0) {
				vlog("OWNER");
				echo json_encode(['is_owner' => true]);
			} else {
				vlog("NOT OWNER");
				echo json_encode(['is_owner' => false]);
			}
		}
	} else {
		vlog("USER NOT FOUND 401");
		http_response_code(401);
	}

// ===== Get Project Info
} else if($method == 'POST' && $path == 'projectinfo') {
	vlog("\n\nPOST /projectinfo");
	$data = clean($_POST);
	$sql = "SELECT ID, name, url, detail, gallery, user_id FROM projects WHERE url = '".$data['url']."' LIMIT 1;";
	vlog($sql);
	$result = $db->query($sql);	
	if ($result->num_rows > 0) { 
		while($p = $result->fetch_assoc()) {
			vlog("PROJECT FOUND, GET USER INFO");
			$sql = "SELECT ID, email, fname, lname, token FROM users WHERE ID = ".$p['user_id']." LIMIT 1;";
			$owner = [];
			$result2 = $db->query($sql);
			vlog($sql);			
			if ($result2->num_rows > 0) { while($u = $result2->fetch_assoc()) {
				vlog("RETURN USER INFO");				
				$owner = [
					'ID' => $u['ID'],
					'email' => $u['email'],
					'fname' => $u['fname'],
					'lname' => $u['lname'],
					'hasEditPermission' => $data['token'] === $u['token']
				];
			}}
			echo json_encode([
				'project_id' => $p['ID'],
				'name' => $p['name'],
				'url' => $p['url'],
				'detail' => $p['detail'],
				'owner' => $owner,
				'gallery' => json_decode($p['gallery'])
			]);
		} 
	} else {
		vlog("PROJECT NOT FOUND");
		echo json_encode(null);
	}
	
// ===== Edit Project Info
} else if($method == 'POST' && $path == 'editproject') {
	vlog("\n\nPOST /editproject");
	$data = clean($_POST);
	$sql = "SELECT ID, token FROM users WHERE token = '".$data['token']."' LIMIT 1;";
	vlog($sql);
	$result = $db->query($sql);	
	$t = false;
	if ($result->num_rows > 0) { 
		while($u = $result->fetch_assoc()) {
			vlog("USER FOUND, UPDATE PROJECT INFO");
			$q = ["ID = '".$data["project_id"]."'"];
			if(isset($data["name"])) {
				$q[] = "name='".$data["name"]."'";
			}
			if(isset($data["detail"])) {
				$q[] = "detail='".$data["detail"]."'";
			}
			if(isset($data["gallery"])) {
				$q[] = "gallery='".json_encode($data["gallery"])."'";
			}
			$sql = "UPDATE projects SET ".implode(",",$q)." WHERE ID = '".$data["project_id"]."' AND user_id = ".$u['ID'].";";
			vlog($sql);
			$result = $db->query($sql);	
			if ($db->affected_rows) {
				$t = true;
			}
			echo json_encode(['success' => $t]);
		} 
	} else {
		vlog("USER NOT FOUND");
		http_response_code(401);
	}
	
// ===== List Projects
} else if($method == 'POST' && $path == 'myprojects') {
	vlog("\n\nPOST /myprojects");
	$data = clean($_POST);
	$sql = "SELECT * FROM users WHERE token LIKE '".$data['token']."' LIMIT 1;";
	vlog($sql);
	$result = $db->query($sql);
	if ($result->num_rows > 0) {
		vlog("USER FOUND");
		while($u = $result->fetch_assoc()) {
			$owner = [
				'ID' => $u['ID'],
				'email' => $u['email'],
				'fname' => $u['fname'],
				'lname' => $u['lname']
			];
			vlog("Get Project List");		
			$sql = "SELECT * FROM projects WHERE user_id = ".$u['ID']." ;";
			vlog($sql);	
			$result2 = $db->query($sql);		
			if ($result2->num_rows > 0) {
				vlog("FOUND ".$result2->num_rows);
				$url = [];
				while($p = $result2->fetch_assoc()) {
					$url[] = [
						'project_id' => $p['ID'],
						'name' => $p['name'],
						'url' => $p['url'],
						'detail' => $p['detail'],
						'owner' => $owner,
						'gallery' => json_decode($p['gallery'])
					];
				}
				echo json_encode($url);
			} else {
				vlog("NOT OWNER");
				echo json_encode([]);
			}
		}
	} else {
		vlog("USER NOT FOUND 401");
		http_response_code(401);
	}

// ===== Default
} else {
    http_response_code(405);
    exit;
}

function vlog($t) {
	$logfile = dirname(__FILE__)."/kiki.log";
	error_log($t."\n", 3, $logfile);
}

function clean($arr) {
	global $db;
	foreach($arr as $k => $v) {
		if(is_array($arr[$k]) || ($arr[$k] instanceof Traversable)) {
			$arr[$k] = clean($arr[$k]);
		}
		else $arr[$k] = $db->real_escape_string($v);
	}
	return $arr;
}
function randToken($length = 10) {
	$characters = 'abcdefghijkmnopqrstuvwxyz123456789ABCDEFGHJKLMNPQRSTUVWXYZ';
	$charactersLength = strlen($characters);
	$randomString = '';
	for ($i = 0; $i < $length; $i++) {
		$randomString .= $characters[rand(0, $charactersLength - 1)];
	}
	return $randomString;
}

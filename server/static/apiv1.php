<?php
//error_reporting(E_ALL);
//ini_set('display_errors','On');

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
	vlog("\n\nPOST /emailavailable ".$data['email']);
	vlog(print_r($_POST,true));
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

// ===== Request Reset Pass     
} else if($method == 'POST' && $path == 'forget') { 
    $data = clean($_POST);
	$typ = randToken(10);
	vlog("\n\nPOST /forget ".$data['email']);
	vlog($typ);
	$sql = "UPDATE users SET reset = '".$typ."' WHERE email LIKE '".$data['email']."';";
    $result = $db->query($sql); 
	
    if ($db->affected_rows > 0) {
		vlog("SEND MAIL TO USER");
		
		$message = "We heard that you lost your EnablerLab password. Sorry about that!"."\r\n\r\n".
		"But don’t worry! You can use the following link to reset your password:"."\r\n\r\n".
		"https://enablerlab.com/resetpassword/".$typ."\r\n\r\n".
		"Thanks,"."\r\n"."Your friends at EnablerLab";

		$headers = 'From: EnablerLab.com <no-reply@enablerlab.com>' . "\r\n" .
			'Reply-To:  no-reply@enablerlab.com' . "\r\n" .
			'X-Mailer: PHP/' . phpversion();
		mail($data['email'], "Reset Password Link - EnablerLab.com", $message, $headers);
		$back = ['success'=>true];
	} else {
		vlog("EMAIL NOT FOUND");		
		$back = ['success'=>false];
    }
	echo json_encode($back);

// ===== Reset new Pass
} else if($method == 'POST' && $path == 'changepwd') { 
    $data = clean($_POST);
	$data['password'] = password_hash($data['password'],PASSWORD_BCRYPT);
	vlog("\n\nPOST /chnagepwd ".$data['code']);
	
	$sql = "UPDATE users SET reset='', token = '', password = '".$data['password']."' WHERE reset LIKE '".$data['code']."';";
    $result = $db->query($sql);
    if ($db->affected_rows > 0) {
		$back = ['success'=>true];
	} else {
		$back = ['success'=>false];
    }
	echo json_encode($back);

// ===== Check Reset Code
} else if($method == 'POST' && $path == 'checktochange') { 
    $data = clean($_POST);
	vlog("\n\nPOST /checktochange ".$data['code']);
	
	$sql = "SELECT fname from users WHERE reset LIKE '".$data['code']."';";
    $result = $db->query($sql);
    if ($result->num_rows > 0) {
		while($r = $result->fetch_assoc()) {
			$back = ['found'=>true, 'fname'=>$r['fname']];
		}
	} else {
		$back = ['found'=>false];
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
	$sql = "SELECT ID, name, hit, url, detail, gallery, user_id FROM projects WHERE url = '".$data['url']."' LIMIT 1;";
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
				'view' => $p['hit'],
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
			$db->query($sql);	
			if ($db->affected_rows) {
				$t = true;
			}
			echo json_encode(['success' => $t]);
		} 
	} else {
		vlog("USER NOT FOUND");
		http_response_code(401);
	}

	
// ===== Delete Project
} else if($method == 'POST' && $path == 'deleteproject') {
	vlog("\n\nPOST /deleteproject");
	$data = clean($_POST);
	$sql = "SELECT ID, token FROM users WHERE token = '".$data['token']."' LIMIT 1;";
	vlog($sql);
	$result = $db->query($sql);	
	$t = false;
	if ($result->num_rows > 0) { 
		while($u = $result->fetch_assoc()) {
			vlog("USER FOUND, DELETING PROJECT");
			$sql = "DELETE FROM projects WHERE ID = ".$data["project_id"]." AND user_id = ".$u['ID'].";";
			vlog($sql);
			$db->query($sql);	
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
						'view' => $p['hit'],
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

// ===== Search Projects
} else if($method == 'POST' && $path == 'searchprojects') {
	vlog("\n\nPOST /searchprojects");
	$data = clean($_POST);
	$sql = "SELECT projects.*, users.fname, users.ID as uid, users.lname, users.email FROM projects JOIN users ON projects.user_id = users.ID WHERE projects.name LIKE '%".$data['keyword']."%';";
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
				'view' => $p['hit'],
				'owner' => [
					'ID' => $p['uid'],
					'email' => $p['email'],
					'fname' => $p['fname'],
					'lname' => $p['lname']
				],
				'gallery' => json_decode($p['gallery'])
			];
		}
		echo json_encode($url);
	} else {
		vlog("NO MATCH");
		echo json_encode([]);
	}

// ===== Adv Search Projects
} else if($method == 'POST' && $path == 'advancesearch') {
	vlog("\n\nPOST /advancesearch");
	$data = clean($_POST);
	$order = (@$data['order'] == "ASC") ? "ASC" : "DESC";
	$orderBy = (@$data['orderby'] == "NAME") ? "projects.name" : (@$data['orderby'] == "DATE") ? "projects.ID" : "projects.hit";
	$start = (isset($data['start'])) ? (int)$data['start'] : 0;
	$length = (isset($data['length'])) ? (int)$data['length'] : 10;
	$where = [ "1 = 1" ];
	if(isset($data['projectname'])) $where[] = "projects.name LIKE '%".$data['projectname']."%'";
	if(isset($data['ownerfname'])) $where[] = "users.fname LIKE '%".$data['ownerfname']."%'";
	if(isset($data['ownerlname'])) $where[] = "users.lname LIKE '%".$data['ownerlname']."%'";
	
	$where = implode(" AND ",$where);
	$sql = "SELECT projects.*, users.fname, users.ID as uid, users.lname, users.email FROM projects JOIN users ON projects.user_id = users.ID WHERE ".$where." ORDER BY ".$orderBy." ".$order." LIMIT ".$start.", ".$length.";";
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
				'view' => $p['hit'],
				'owner' => [
					'ID' => $p['uid'],
					'email' => $p['email'],
					'fname' => $p['fname'],
					'lname' => $p['lname']
				],
				'gallery' => json_decode($p['gallery'])
			];
		}
		echo json_encode($url);
	} else {
		vlog("NO MATCH");
		echo json_encode([]);
	}


// ===== Update Proejct View
} else if($method == 'GET' && preg_match('@^view/([0-9]+)@i', $path, $matches)) {
	vlog("\n\nPOST /view/".$matches[1]);
	$data = clean($_GET);
	$sql = "UPDATE projects SET hit = hit + 1 WHERE ID = ".(int)$matches[1]." ;";
	vlog($sql);
	$db->query($sql);
	if ($db->affected_rows > 0) {
        echo json_encode(['updated' => true]);
    } else {
        echo json_encode(['updated' => false]);
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

<?php
header('Access-Control-Allow-Headers: Content-Type,x-prototype-version,x-requested-with');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Origin: *');
header('Cache-Control: max-age=900');
header('Content-Type: application/json'); 

if ($_POST) {
	$resposta 		= $_POST['resposta'];
	// $emailEmpresa 	= $_POST['email-empresa'];
	$emailEmpresa 	= 'email@example.com.br';
	$remetente	 	= 'nao-responda@example.com.br';
	$assunto 		= $_POST['assunto']; 
	$empresa 		= $_POST['empresa'];
	$nome 			= $_POST['nome']; 
	$email			= $_POST['email'];
	$telefone 		= $_POST['telefone'];
	$msg 			= $_POST['message'];
	$cdd 			= $_POST['cidade'];
	$agradecimento 	= $_POST['agradecimento'];
	$corpo='
		<!DOCTYPE html>
		<html>
		<head>
		</head>
		<body>
		<p>	Nome : '.$nome.' </br></p>
		<p>	Email : '.$email.' </br></p>
		<p>	Telefone : <a href=tel:'.$tel.'>' .$telefone. '</a> </br></p>
		<p>	Cidade : '.$cdd.' </br></p>
		<p>	Mensagem : '.$msg.' </br></p>
		</body>
		</html>';
}else{
	echo "Sem parámetros para enviar o email...";
}

require 'PHPMailerAutoload.php';

$mail = new PHPMailer();
$mail->IsSMTP();
// $mail->SMTPDebug = 0;
$mail->Host = "smtp.uni5.net";
$mail->SMTPAuth = true;
$mail->Port = 587;
$mail->SMTPSecure = false;
$mail->SMTPAutoTLS = false; 
$mail->Username = 'email@example.com.br';
$mail->Password = 'pass';

$mail->FromName = $nome; //Nome que será exibido
$mail->From = $remetente; //Obrigatório ser a mesma caixa postal configurada no remetente do SMTP
$mail->AddAddress( $emailEmpresa ,$empresa); //Destinatários
$mail->Subject = $assunto;
// $mail->Body = $corpo;
$mail->msgHTML($corpo);

if (!$mail->send()) {
    echo "Mailer Error: " . $mail->ErrorInfo;
} else {
    echo "Message sent!";
}
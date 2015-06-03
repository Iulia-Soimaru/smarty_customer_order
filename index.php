<?php
 
include_once "Smarty/libs/Smarty.class.php";

$smarty = new Smarty();
$smarty->template_dir = "templates/";
$smarty->compile_dir = "templates_c/";
$smarty->display('order.tpl');

?>
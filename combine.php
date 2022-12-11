<?php
    include_once("vendor/autoload.php");
    $report_name = $argv[1];
    $appname = $argv[2];
    $exist = file_exists("cookies/a_$appname.json"); #using whether file exist to enable the filtering mode.
    if($exist){
        $rough_data = file_get_contents("cookies/a_$appname.json");
        $cookies = json_decode($rough_data);
    }
    $coverages = glob("coverages/*.json");
    #increase the memory in multiples of 128M in case of memory error
    ini_set('memory_limit', '12800M');

    $final_coverage = new SebastianBergmann\CodeCoverage\CodeCoverage;
    $count = count($coverages);
    $i = 0;

    $final_coverage->filter()->addDirectoryToWhitelist("/var/www/$appname/");
    echo "start iterating" . PHP_EOL;
    foreach ($coverages as $coverage_file)
    {   
        $i++;
        $flag = false;
        if($exist){
            foreach($cookies as $cookie_value)
            {
                $flag = strpos($coverage_file, $cookie_value);
                if($flag == true){
                    break;
                }
            }
            if($flag == false){
                echo "($i/$count) from $coverage_file not belong to admin user, skip". PHP_EOL;
                continue;
            }
        }
        echo "Processing coverage ($i/$count) from $coverage_file". PHP_EOL;
        $codecoverageData = json_decode(file_get_contents($coverage_file), JSON_OBJECT_AS_ARRAY);
        if($codecoverageData == NULL){
            echo "skip". PHP_EOL;
            continue;
        }
        $test_name = str_ireplace(basename($coverage_file,".json"),"coverage-", "");
        $final_coverage->append($codecoverageData, $test_name);
    }   

    echo "Generating final report..." . PHP_EOL;
    $report = new \SebastianBergmann\CodeCoverage\Report\Html\Facade;
    $report->process($final_coverage, $report_name);
    echo "Report generated succesfully". PHP_EOL;
?>

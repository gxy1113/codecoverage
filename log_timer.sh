while getopts "a:t:" option; do
   case $option in
      a) # display Help
         APPNAME=$OPTARG;;
      t) # Enter a name
         START_TIME=$OPTARG;;
     \?) # Invalid option
         echo "Error: Invalid option"
         exit;;
   esac
done
sleep 10
echo $APPNAME
echo $START_TIME
for i in `seq 1 24`;
do
    echo "take snapshot of coverages-$i"
    screen -dmS test-$i php combine.php $i $APPNAME $START_TIME;
    sleep 300
    #cp -TR coverages/ coverages-$i/
done

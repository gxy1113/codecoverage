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
cd /var/www/codecoverage
screen -dmS rep-gen ./log_timer.sh -a $APPNAME -t $START_TIME
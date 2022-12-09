APPNAME=$1
sleep 300
for i in `seq 1 12`;
do
    sleep 7200
    echo "take snapshot of coverages-$i"
    screen -dmS test-$i php combine.php "reports-$i" $APPNAME
    #cp -TR coverages/ coverages-$i/
done

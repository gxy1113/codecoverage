APPNAME=$1
START_TIME=1672452949
sleep 10
for i in `seq 1 24`;
do
    echo "take snapshot of coverages-$i"
    screen -dmS test-$i php combine.php $i $APPNAME $START_TIME;
    sleep 1800
    #cp -TR coverages/ coverages-$i/
done

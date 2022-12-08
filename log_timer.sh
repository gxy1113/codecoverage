APPNAME=$1
sleep 300
for i in {1..12}
do
    sleep 7200
    #php combine.php "reports-$i" $APPNAME
    cp -TRv coverages/ coverages-$i/
done

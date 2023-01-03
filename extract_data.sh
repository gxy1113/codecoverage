rm data.txt
for i in `seq 1 24`;
do
    node parse.js reports_$i;
done

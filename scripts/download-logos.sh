#!/bin/bash
# Downloads high-res SVG logos for all lender partners

OUT="/Users/tectonic/Documents/Samruthi/samruthi-one/public/logos"
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
BASE="https://commons.wikimedia.org/wiki/Special:FilePath"

download() {
  local name="$1"
  local file="$2"
  local out="$3"
  echo -n "  $name ... "
  HTTP=$(curl -s -o "$OUT/$out" -w "%{http_code}" -L -A "$UA" "$BASE/$file")
  if [ "$HTTP" = "200" ]; then
    SIZE=$(wc -c < "$OUT/$out")
    echo "✓ (${SIZE} bytes)"
  else
    echo "✗ HTTP $HTTP"
    rm -f "$OUT/$out"
  fi
}

echo "=== Downloading bank logos ==="
download "ICICI Bank"          "ICICI_Bank_Logo.svg"                    "icici.svg"
download "HDFC Bank"           "HDFC_Bank_Logo.svg"                     "hdfc.svg"
download "Kotak Mahindra"      "Kotak_Mahindra_Bank_logo.svg"           "kotak.svg"
download "Axis Bank"           "Axis_bank_logo.svg"                     "axis.svg"
download "IndusInd Bank"       "IndusInd_Bank_Logo.svg"                 "indusind.svg"
download "Standard Chartered"  "Standard_Chartered.svg"                 "sc.svg"
download "Bank of India"       "Bank_of_india.svg"                      "boi.svg"
download "City Union Bank"     "City_Union_Bank_logo.png"               "cub.png"
download "Yes Bank"            "Yes_Bank_Logo.svg"                      "yesbank.svg"
download "Indian Bank"         "Indian_Bank_Logo.svg"                   "indianbank.svg"

echo ""
echo "=== Downloading NBFC logos ==="
download "Cholamandalam"       "Cholamandalam_Investment_and_Finance_Company_Logo.svg" "chola.svg"
download "Aditya Birla Finance" "Aditya_Birla_Capital.svg"              "abcapital.svg"
download "Bajaj Finserv"       "Bajaj_Finserv_logo.svg"                 "bajaj.svg"
download "Tata Capital"        "Tata_Capital.svg"                       "tatacapital.svg"
download "L&T Finance"         "L%26T_Finance.svg"                      "ltfinance.svg"
download "Fullerton India"     "Fullerton_India_Logo.svg"               "fullerton.svg"

echo ""
echo "=== Files in $OUT ==="
ls -la "$OUT"

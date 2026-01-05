"""
Script to extract emails from accounts with NON-NIGERIAN addresses.
Uses multiple detection methods for accuracy:
1. NATIONALITY column (if not "NIGERIA")
2. CUS_GEO_LOCA column (geographic location)
3. STATE_OF_RES column (state of residence)
4. ADDRESS text analysis (checking for Nigerian locations)

Data sourced from Wikipedia for accuracy:
- All 36 Nigerian states + FCT
- Major Nigerian cities
- Common Nigerian address patterns
"""

import re
import csv

# ============================================================================
# COMPREHENSIVE NIGERIAN LOCATION DATABASE (from Wikipedia)
# ============================================================================

# All 36 Nigerian States + FCT
NIGERIAN_STATES = {
    'ABIA', 'ADAMAWA', 'AKWA IBOM', 'AKWA-IBOM', 'ANAMBRA', 'BAUCHI', 'BAYELSA',
    'BENUE', 'BORNO', 'CROSS RIVER', 'CROSS-RIVER', 'DELTA', 'EBONYI', 'EDO',
    'EKITI', 'ENUGU', 'GOMBE', 'IMO', 'JIGAWA', 'KADUNA', 'KANO', 'KATSINA',
    'KEBBI', 'KOGI', 'KWARA', 'LAGOS', 'NASARAWA', 'NIGER', 'OGUN', 'ONDO',
    'OSUN', 'OYO', 'PLATEAU', 'RIVERS', 'SOKOTO', 'TARABA', 'YOBE', 'ZAMFARA',
    'FCT', 'FEDERAL CAPITAL TERRITORY', 'F.C.T', 'F.C.T.'
}

# Major Nigerian Cities (from Wikipedia List of populated places in Nigeria)
NIGERIAN_CITIES = {
    # Major cities
    'LAGOS', 'ABUJA', 'KANO', 'IBADAN', 'PORT HARCOURT', 'BENIN CITY', 'MAIDUGURI',
    'ZARIA', 'ABA', 'JOS', 'ILORIN', 'OYO', 'ENUGU', 'ABEOKUTA', 'ONITSHA',
    'WARRI', 'SOKOTO', 'CALABAR', 'KATSINA', 'AKURE', 'BAUCHI', 'EBUTE METTA',
    'OWERRI', 'UMUAHIA', 'MINNA', 'OSHOGBO', 'OSOGBO', 'OKENE', 'KADUNA', 'MAKURDI',
    
    # State capitals and other major cities
    'ABAKALIKI', 'ADO EKITI', 'ADO-EKITI', 'AWKA', 'ASABA', 'YENAGOA', 'LOKOJA',
    'LAFIA', 'DUTSE', 'GOMBE', 'BIRNIN KEBBI', 'JALINGO', 'GUSAU', 'DAMATURU',
    'YOLA', 'UYO', 'IKEJA', 'POTISKUM', 'SULEJA', 'SAPELE', 'UGHELLI',
    
    # Other populated cities
    'AFIKPO', 'AGBOR', 'AKPAWFU', 'AUCHI', 'AWGU', 'BIDA', 'BUGUMA', 'EDE',
    'EKET', 'IFE', 'IKIRUN', 'IKOT ABASI', 'IKOT EKPENE', 'IWO', 'JEBBA',
    'JIMETA', 'KABBA', 'KARU', 'KONTAGORA', 'KUTIGI', 'LEKKI', 'NNEWI',
    'NSUKKA', 'OFFA', 'OGBOMOSO', 'OGAMINANA', 'OMU-ARAN', 'ONDO', 'ORON',
    'OWO', 'ORLU', 'UROMI', 'WUKARI',
    
    # Lagos areas
    'VICTORIA ISLAND', 'V.I', 'VI', 'IKOYI', 'LEKKI', 'AJAH', 'FESTAC',
    'SURULERE', 'YABA', 'IKEJA', 'GBAGADA', 'MARYLAND', 'OJOTA', 'KETU',
    'MILE 2', 'APAPA', 'ISOLO', 'MUSHIN', 'OSHODI', 'AGEGE', 'OGBA',
    'IKOTUN', 'IYANA IPAJA', 'EGBEDA', 'ALIMOSHO', 'BADAGRY', 'EPE',
    'IKORODU', 'SOMOLU', 'SHOMOLU', 'BARIGA', 'OGUDU', 'OJODU', 'BERGER',
    'MAGODO', 'OMOLE', 'AGIDINGBI', 'DOPEMU', 'IDIMU', 'EJIGBO',
    
    # Abuja areas
    'WUSE', 'GARKI', 'MAITAMA', 'ASOKORO', 'GWARINPA', 'KUBWA', 'NYANYA',
    'KARU', 'LUGBE', 'JABI', 'UTAKO', 'GUDU', 'LIFECAMP', 'LIFE CAMP',
    'GALADIMAWA', 'LOKOGOMA', 'APO', 'DURUMI', 'KUKWABA', 'JIKWOYI',
    
    # Other common areas
    'IKOTA', 'VGC', 'AJAO ESTATE', 'DOLPHIN ESTATE', 'OPEBI', 'ALLEN',
    'TOYIN', 'OREGUN', 'ILUPEJU', 'ANTHONY', 'PEDRO', 'PALMGROVE',
    'FADEYI', 'ONIPANU', 'JIBOWU', 'EBUTE METTA', 'OYINGBO', 'IDDO',
    'IJORA', 'ORILE', 'COSTAIN', 'LAWANSON', 'ITIRE', 'OJUELEGBA',
}

# Common Nigerian address keywords
NIGERIAN_ADDRESS_KEYWORDS = {
    'NIGERIA', 'NIGERIAN', 'NGN', 'NIG', 'N/A',
    # Local Government Areas (LGA)
    'LGA', 'LOCAL GOVERNMENT',
    # Common street types
    'CRESCENT', 'CLOSE', 'AVENUE', 'STREET', 'ROAD', 'DRIVE', 'WAY',
    'ESTATE', 'LAYOUT', 'EXTENSION', 'PHASE',
}

# Foreign countries to detect (non-Nigerian)
FOREIGN_COUNTRIES = {
    # Major countries
    'USA', 'U.S.A', 'UNITED STATES', 'AMERICA', 'AMERICAN',
    'UK', 'U.K', 'UNITED KINGDOM', 'ENGLAND', 'BRITAIN', 'BRITISH', 'LONDON',
    'CANADA', 'CANADIAN', 'TORONTO', 'VANCOUVER', 'MONTREAL', 'OTTAWA',
    'GHANA', 'GHANAIAN', 'ACCRA', 'KUMASI',
    'SOUTH AFRICA', 'JOHANNESBURG', 'CAPE TOWN', 'PRETORIA', 'DURBAN',
    'DUBAI', 'UAE', 'U.A.E', 'UNITED ARAB EMIRATES', 'ABU DHABI', 'SHARJAH',
    'CHINA', 'CHINESE', 'BEIJING', 'SHANGHAI', 'GUANGZHOU', 'SHENZHEN',
    'INDIA', 'INDIAN', 'MUMBAI', 'DELHI', 'BANGALORE', 'CHENNAI',
    'GERMANY', 'GERMAN', 'BERLIN', 'MUNICH', 'FRANKFURT', 'HAMBURG',
    'FRANCE', 'FRENCH', 'PARIS', 'LYON', 'MARSEILLE',
    'ITALY', 'ITALIAN', 'ROME', 'MILAN', 'NAPLES', 'TURIN',
    'SPAIN', 'SPANISH', 'MADRID', 'BARCELONA', 'VALENCIA',
    'NETHERLANDS', 'DUTCH', 'AMSTERDAM', 'ROTTERDAM', 'HAGUE',
    'BELGIUM', 'BELGIAN', 'BRUSSELS', 'ANTWERP',
    'SWITZERLAND', 'SWISS', 'ZURICH', 'GENEVA', 'BERN',
    'AUSTRALIA', 'AUSTRALIAN', 'SYDNEY', 'MELBOURNE', 'BRISBANE', 'PERTH',
    'NEW ZEALAND', 'AUCKLAND', 'WELLINGTON',
    'JAPAN', 'JAPANESE', 'TOKYO', 'OSAKA', 'KYOTO',
    'SINGAPORE', 'SINGAPOREAN',
    'MALAYSIA', 'MALAYSIAN', 'KUALA LUMPUR',
    'KENYA', 'KENYAN', 'NAIROBI', 'MOMBASA',
    'CAMEROON', 'CAMEROONIAN', 'DOUALA', 'YAOUNDE',
    'TOGO', 'TOGOLESE', 'LOME',
    'BENIN REPUBLIC', 'BENINESE', 'COTONOU', 'PORTO NOVO',
    'NIGER REPUBLIC', 'NIAMEY',
    'CHAD', 'CHADIAN', 'NDJAMENA',
    'EGYPT', 'EGYPTIAN', 'CAIRO', 'ALEXANDRIA',
    'MOROCCO', 'MOROCCAN', 'CASABLANCA', 'RABAT',
    'IRELAND', 'IRISH', 'DUBLIN',
    'SCOTLAND', 'EDINBURGH', 'GLASGOW',
    'WALES', 'CARDIFF',
    'PORTUGAL', 'PORTUGUESE', 'LISBON',
    'POLAND', 'POLISH', 'WARSAW', 'KRAKOW',
    'RUSSIA', 'RUSSIAN', 'MOSCOW', 'SAINT PETERSBURG',
    'TURKEY', 'TURKISH', 'ISTANBUL', 'ANKARA',
    'SAUDI ARABIA', 'SAUDI', 'RIYADH', 'JEDDAH', 'MECCA',
    'QATAR', 'QATARI', 'DOHA',
    'KUWAIT', 'KUWAITI',
    'BAHRAIN', 'BAHRAINI', 'MANAMA',
    'OMAN', 'OMANI', 'MUSCAT',
    'LEBANON', 'LEBANESE', 'BEIRUT',
    'ISRAEL', 'ISRAELI', 'TEL AVIV', 'JERUSALEM',
    'BRAZIL', 'BRAZILIAN', 'SAO PAULO', 'RIO DE JANEIRO',
    'MEXICO', 'MEXICAN', 'MEXICO CITY',
    'ARGENTINA', 'ARGENTINIAN', 'BUENOS AIRES',
}

# ============================================================================
# DETECTION FUNCTIONS
# ============================================================================

def normalize_text(text):
    """Normalize text for comparison."""
    if not text:
        return ''
    return text.upper().strip()

def is_nigerian_by_nationality(nationality):
    """Check if nationality is Nigerian."""
    nat = normalize_text(nationality)
    if not nat or nat in ['', 'OTHERS', 'OTHER', 'N/A', '/']:
        return None  # Unknown
    return nat == 'NIGERIA' or nat == 'NIGERIAN'

def is_nigerian_by_geo_location(geo_loc):
    """Check if geographic location is Nigerian."""
    loc = normalize_text(geo_loc)
    if not loc or loc in ['', 'OTHERS', 'OTHER', 'N/A', '/']:
        return None  # Unknown
    return loc == 'NIGERIA'

def is_nigerian_by_state(state):
    """Check if state of residence is Nigerian."""
    st = normalize_text(state)
    if not st or st in ['', 'OTHERS', 'OTHER', 'N/A', '/']:
        return None  # Unknown
    return st in NIGERIAN_STATES

def is_nigerian_by_address(address):
    """
    Analyze address text to determine if it's Nigerian.
    Returns: True (Nigerian), False (Foreign), None (Unknown)
    """
    addr = normalize_text(address)
    if not addr or len(addr) < 5:
        return None  # Too short to determine
    
    # First check for explicit foreign country indicators
    for foreign in FOREIGN_COUNTRIES:
        if foreign in addr:
            # Make sure it's a word boundary match for short terms
            if len(foreign) <= 3:
                if re.search(r'\b' + re.escape(foreign) + r'\b', addr):
                    return False  # Definitely foreign
            else:
                return False  # Definitely foreign
    
    # Check for explicit "NIGERIA" mention
    if 'NIGERIA' in addr:
        return True
    
    # Check for Nigerian states in address
    for state in NIGERIAN_STATES:
        if state in addr:
            return True
    
    # Check for Nigerian cities in address
    for city in NIGERIAN_CITIES:
        if len(city) >= 4:  # Only check cities with 4+ chars to avoid false positives
            if city in addr:
                return True
    
    return None  # Cannot determine

def determine_location_status(nationality, geo_loc, state, address):
    """
    Determine if a record is Nigerian or Non-Nigerian using all available data.
    Returns: ('NIGERIAN', reason) or ('NON-NIGERIAN', reason) or ('UNKNOWN', reason)
    """
    # Priority 1: Explicit nationality
    nat_check = is_nigerian_by_nationality(nationality)
    if nat_check == False:
        return ('NON-NIGERIAN', f'Nationality: {nationality}')
    if nat_check == True:
        return ('NIGERIAN', 'Nationality: NIGERIA')
    
    # Priority 2: Geographic location
    geo_check = is_nigerian_by_geo_location(geo_loc)
    if geo_check == False:
        return ('NON-NIGERIAN', f'Geographic Location: {geo_loc}')
    if geo_check == True:
        return ('NIGERIAN', 'Geographic Location: NIGERIA')
    
    # Priority 3: State of residence
    state_check = is_nigerian_by_state(state)
    if state_check == True:
        return ('NIGERIAN', f'State: {state}')
    
    # Priority 4: Address analysis
    addr_check = is_nigerian_by_address(address)
    if addr_check == False:
        return ('NON-NIGERIAN', f'Foreign address detected')
    if addr_check == True:
        return ('NIGERIAN', 'Nigerian location in address')
    
    # If state was explicitly non-Nigerian
    if state_check == False:
        return ('NON-NIGERIAN', f'Non-Nigerian state: {state}')
    
    return ('UNKNOWN', 'Insufficient data to determine')

# ============================================================================
# MAIN EXTRACTION FUNCTION
# ============================================================================

def extract_non_nigerian_addresses(input_file, output_file):
    """
    Extract emails from accounts with non-Nigerian addresses.
    """
    non_ng_records = []
    unknown_records = []
    total_records = 0
    records_with_email = 0
    
    with open(input_file, 'r', encoding='utf-8', errors='ignore') as f:
        # Read header
        header = f.readline().strip()
        columns = [col.strip('"') for col in header.split('|')]
        
        # Find column indices
        try:
            email_idx = columns.index('E_MAIL')
            name_idx = columns.index('CUST_NAME')
            acct_idx = columns.index('ACCT_NO')
            nationality_idx = columns.index('NATIONALITY')
            geo_loc_idx = columns.index('CUS_GEO_LOCA')
            state_idx = columns.index('STATE_OF_RES')
            address_idx = columns.index('ADDRESS')
        except ValueError as e:
            print(f"Error: Required column not found - {e}")
            return
        
        print(f"Processing file: {input_file}")
        print(f"Columns found: E_MAIL, CUST_NAME, ACCT_NO, NATIONALITY, CUS_GEO_LOCA, STATE_OF_RES, ADDRESS")
        print("-" * 60)
        
        for line in f:
            total_records += 1
            
            # Parse the line
            parts = [p.strip('"') for p in line.strip().split('|')]
            
            if len(parts) <= max(email_idx, nationality_idx, geo_loc_idx, state_idx, address_idx):
                continue
            
            email = parts[email_idx].strip()
            name = parts[name_idx].strip()
            acct = parts[acct_idx].strip()
            nationality = parts[nationality_idx].strip()
            geo_loc = parts[geo_loc_idx].strip()
            state = parts[state_idx].strip()
            address = parts[address_idx].strip()
            
            # Skip if no valid email
            if not email or email in ['', 'nil', 'N/A', '.', '/', 'N/a']:
                continue
            
            # Validate email format
            if not re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', email):
                continue
            
            records_with_email += 1
            
            # Determine location status
            status, reason = determine_location_status(nationality, geo_loc, state, address)
            
            record = {
                'account_no': acct,
                'customer_name': name,
                'email': email,
                'nationality': nationality,
                'geo_location': geo_loc,
                'state': state,
                'address': address[:100],  # Truncate long addresses
                'detection_reason': reason
            }
            
            if status == 'NON-NIGERIAN':
                non_ng_records.append(record)
            elif status == 'UNKNOWN':
                unknown_records.append(record)
    
    # Write NON-NIGERIAN results
    with open(output_file, 'w', encoding='utf-8', newline='') as f:
        fieldnames = ['account_no', 'customer_name', 'email', 'nationality', 
                      'geo_location', 'state', 'address', 'detection_reason']
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(non_ng_records)
    
    # Write email-only file
    email_only_file = output_file.replace('.csv', '_emails_only.txt')
    with open(email_only_file, 'w', encoding='utf-8') as f:
        for record in non_ng_records:
            f.write(record['email'] + '\n')
    
    # Write UNKNOWN records for review
    unknown_file = output_file.replace('.csv', '_unknown.csv')
    with open(unknown_file, 'w', encoding='utf-8', newline='') as f:
        fieldnames = ['account_no', 'customer_name', 'email', 'nationality', 
                      'geo_location', 'state', 'address', 'detection_reason']
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(unknown_records)
    
    # Print summary
    print(f"\n{'='*60}")
    print("EXTRACTION SUMMARY - NON-NIGERIAN ADDRESSES")
    print(f"{'='*60}")
    print(f"Total records processed:     {total_records:,}")
    print(f"Records with valid email:    {records_with_email:,}")
    print(f"NON-NIGERIAN records:        {len(non_ng_records):,}")
    print(f"UNKNOWN records:             {len(unknown_records):,}")
    print(f"\nOutput files:")
    print(f"  - Non-Nigerian (full):   {output_file}")
    print(f"  - Non-Nigerian (emails): {email_only_file}")
    print(f"  - Unknown (for review):  {unknown_file}")
    print(f"{'='*60}")
    
    # Print sample of extracted records
    if non_ng_records:
        print(f"\nSample NON-NIGERIAN records (first 15):")
        print("-" * 100)
        for i, record in enumerate(non_ng_records[:15], 1):
            print(f"{i}. {record['email']}")
            print(f"   Reason: {record['detection_reason']}")
            print(f"   Nationality: {record['nationality']} | State: {record['state']}")
            print()
    else:
        print("\nNo records with non-Nigerian addresses found.")
    
    return non_ng_records, unknown_records

if __name__ == "__main__":
    input_file = r"c:\Users\Wisdom\Desktop\MONEY-HIVE\All Accts.txt"
    output_file = r"c:\Users\Wisdom\Desktop\MONEY-HIVE\non_nigerian_address.csv"
    
    extract_non_nigerian_addresses(input_file, output_file)

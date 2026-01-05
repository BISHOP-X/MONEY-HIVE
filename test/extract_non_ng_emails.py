"""
Script to extract emails from accounts with non-Nigerian phone numbers.
Nigerian numbers typically start with:
- Country code: +234 or 234
- Local prefixes: 070, 080, 081, 090, 091, 0701, 0702, 0703, 0704, 0705, 0706, 0707, 0708, 0709, etc.
"""

import re
import csv

def is_nigerian_number(phone):
    """
    Check if a phone number is Nigerian.
    Nigerian numbers:
    - Start with 234 (country code)
    - Start with 0 followed by 70, 80, 81, 90, 91 (local format)
    """
    if not phone or phone.strip() in ['', '0', 'O', 'nil', 'N/A', '/']:
        return None  # Invalid/empty number - skip
    
    # Clean the phone number
    phone = phone.strip().replace('+', '').replace('-', '').replace(' ', '')
    
    # Check if it's a valid phone number (has digits)
    if not re.search(r'\d{7,}', phone):
        return None  # Not a valid phone number
    
    # Nigerian patterns
    nigerian_patterns = [
        r'^234',           # International format with country code
        r'^0[789][01]\d',  # Local format: 070x, 080x, 081x, 090x, 091x
    ]
    
    for pattern in nigerian_patterns:
        if re.match(pattern, phone):
            return True
    
    return False

def extract_non_nigerian_emails(input_file, output_file):
    """
    Extract emails from accounts with non-Nigerian phone numbers.
    """
    non_ng_emails = []
    total_records = 0
    records_with_email = 0
    non_ng_records = 0
    
    with open(input_file, 'r', encoding='utf-8', errors='ignore') as f:
        # Read header
        header = f.readline().strip()
        columns = [col.strip('"') for col in header.split('|')]
        
        # Find column indices
        email_idx = columns.index('E_MAIL') if 'E_MAIL' in columns else None
        mob_idx = columns.index('MOB_NUM') if 'MOB_NUM' in columns else None
        name_idx = columns.index('CUST_NAME') if 'CUST_NAME' in columns else None
        acct_idx = columns.index('ACCT_NO') if 'ACCT_NO' in columns else None
        
        if email_idx is None or mob_idx is None:
            print("Error: Required columns not found!")
            return
        
        print(f"Processing file: {input_file}")
        print(f"Email column index: {email_idx}")
        print(f"Mobile number column index: {mob_idx}")
        print("-" * 50)
        
        for line in f:
            total_records += 1
            
            # Parse the line
            parts = [p.strip('"') for p in line.strip().split('|')]
            
            if len(parts) <= max(email_idx, mob_idx):
                continue
            
            email = parts[email_idx].strip() if email_idx < len(parts) else ''
            phone = parts[mob_idx].strip() if mob_idx < len(parts) else ''
            name = parts[name_idx].strip() if name_idx and name_idx < len(parts) else ''
            acct = parts[acct_idx].strip() if acct_idx and acct_idx < len(parts) else ''
            
            # Skip if no email
            if not email or email in ['', 'nil', 'N/A', '.', '/']:
                continue
            
            # Validate email format
            if not re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', email):
                continue
                
            records_with_email += 1
            
            # Check if phone number is non-Nigerian
            is_ng = is_nigerian_number(phone)
            
            if is_ng == False:  # Explicitly non-Nigerian (not None/invalid)
                non_ng_records += 1
                non_ng_emails.append({
                    'account_no': acct,
                    'customer_name': name,
                    'email': email,
                    'phone': phone
                })
    
    # Write results to output file
    with open(output_file, 'w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=['account_no', 'customer_name', 'email', 'phone'])
        writer.writeheader()
        writer.writerows(non_ng_emails)
    
    # Also create a simple email-only file
    email_only_file = output_file.replace('.csv', '_emails_only.txt')
    with open(email_only_file, 'w', encoding='utf-8') as f:
        for record in non_ng_emails:
            f.write(record['email'] + '\n')
    
    # Print summary
    print(f"\n{'='*50}")
    print("EXTRACTION SUMMARY")
    print(f"{'='*50}")
    print(f"Total records processed: {total_records:,}")
    print(f"Records with valid email: {records_with_email:,}")
    print(f"Records with non-Nigerian numbers: {non_ng_records:,}")
    print(f"\nOutput files:")
    print(f"  - Full details: {output_file}")
    print(f"  - Emails only: {email_only_file}")
    print(f"{'='*50}")
    
    # Print sample of extracted emails
    if non_ng_emails:
        print(f"\nSample of extracted records (first 10):")
        print("-" * 80)
        for i, record in enumerate(non_ng_emails[:10], 1):
            print(f"{i}. {record['email']} | Phone: {record['phone']} | Name: {record['customer_name'][:30]}")
    else:
        print("\nNo records with non-Nigerian phone numbers found.")
    
    return non_ng_emails

if __name__ == "__main__":
    input_file = r"c:\Users\Wisdom\Desktop\MONEY-HIVE\All Accts.txt"
    output_file = r"c:\Users\Wisdom\Desktop\MONEY-HIVE\non_nigerian_emails.csv"
    
    extract_non_nigerian_emails(input_file, output_file)

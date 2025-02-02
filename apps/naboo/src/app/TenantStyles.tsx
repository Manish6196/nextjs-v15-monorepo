'use client';

import { useEffect } from 'react';

function TenantStyles() {
  const tenantName = process.env.TENANT_NAME || 'default';
  const cssUrl = process.env.CSS_URL || 'http://localhost:3000/scss';

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${cssUrl}/styles.css`;
    document.head.appendChild(link);
  }, [tenantName, cssUrl]);

  return null;
}

export default TenantStyles;

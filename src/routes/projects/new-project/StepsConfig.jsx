import React from "react"
import { Box, TextContent } from "@cloudscape-design/components"

export const ENGINES = [
  {
    label: "Amazon Aurora",
    value: "aurora",
    image: <img height='150px' src='./resources/image-placeholder.png' alt='Amazon Aurora' aria-hidden='true'/>,
  },
  {
    label: "MySQL",
    value: "mysql",
    image: <img height='150px' src='./resources/image-placeholder.png' alt='MySQL' aria-hidden='true'/>,
  },
  {
    label: "MariaDB",
    value: "maria",
    image: <img height='150px' src='./resources/image-placeholder.png' alt='MariaDB' aria-hidden='true'/>,
  },
  {
    label: "PostgreSQL",
    value: "postgres",
    image: <img height='150px' src='./resources/image-placeholder.png' alt='PostgreSQL' aria-hidden='true'/>,
  },
  {
    label: "Oracle",
    value: "oracle",
    image: <img height='150px' src='./resources/image-placeholder.png' alt='Oracle' aria-hidden='true'/>,
  },
  {
    label: "Microsoft SQL Server",
    value: "microsoft",
    image: <img height='150px' src='./resources/image-placeholder.png' alt='Microsoft SQL Server' aria-hidden='true'/>,
  },
]

export const ENGINE_VERSIONS = {
  mysql: [
    {
      label: "MySQL 5.7.21",
      value: "1",
    },
    {
      label: "MySQL 5.7.19",
      value: "2",
    },
    {
      label: "MySQL 5.7.17",
      value: "3",
    },
    {
      label: "MySQL 5.7.16",
      value: "4",
    },
    {
      label: "MySQL 5.6.39",
      value: "5",
    },
    {
      label: "MySQL 5.6.37",
      value: "6",
    },
    {
      label: "MySQL 5.6.35",
      value: "7",
    },
    {
      label: "MySQL 5.6.34",
      value: "8",
    },
    {
      label: "MySQL 5.6.29",
      value: "9",
    },
    {
      label: "MySQL 5.6.27",
      value: "10",
    },
    {
      label: "MySQL 5.5.59",
      value: "11",
    },
    {
      label: "MySQL 5.6.57",
      value: "12",
    },
  ],
  maria: [
    {
      label: "MariaDB 10.2.12",
      value: "1",
    },
    {
      label: "MariaDB 10.2.11",
      value: "2",
    },
    {
      label: "MariaDB 10.1.31",
      value: "3",
    },
    {
      label: "MariaDB 10.1.26",
      value: "4",
    },
    {
      label: "MariaDB 10.1.23",
      value: "5",
    },
    {
      label: "MariaDB 10.1.19",
      value: "6",
    },
    {
      label: "MariaDB 10.1.14",
      value: "7",
    },
    {
      label: "MariaDB 10.0.34",
      value: "8",
    },
    {
      label: "MariaDB 10.0.32",
      value: "9",
    },
    {
      label: "MariaDB 10.0.31",
      value: "10",
    },
  ],
  postgres: [
    {
      label: "PostgreSQL 9.6.6-R1",
      value: "1",
    },
    {
      label: "PostgreSQL 9.6.5-R1",
      value: "2",
    },
    {
      label: "PostgreSQL 9.6.3-R1",
      value: "3",
    },
    {
      label: "PostgreSQL 9.6.2-R1",
      value: "4",
    },
    {
      label: "PostgreSQL 9.6.1-R1",
      value: "5",
    },
    {
      label: "PostgreSQL 9.5.12-R1",
      value: "6",
    },
    {
      label: "PostgreSQL 9.5.10-R1",
      value: "7",
    },
    {
      label: "PostgreSQL 9.5.9-R1",
      value: "8",
    },
    {
      label: "PostgreSQL 9.5.7-R1",
      value: "9",
    },
    {
      label: "PostgreSQL 9.5.7-R1",
      value: "10",
    },
    {
      label: "PostgreSQL 9.5.4-R1",
      value: "11",
    },
  ],
  oracle: [
    {
      label: "Oracle 12.1.0.2.v12",
      value: "1",
    },
    {
      label: "Oracle 12.1.0.2.v11",
      value: "2",
    },
    {
      label: "Oracle 12.1.0.2.v10",
      value: "3",
    },
    {
      label: "Oracle 12.1.0.2.v9",
      value: "4",
    },
    {
      label: "Oracle 12.1.0.2.v8",
      value: "5",
    },
    {
      label: "Oracle 12.1.0.2.v7",
      value: "6",
    },
    {
      label: "Oracle 12.1.0.2.v6",
      value: "7",
    },
    {
      label: "Oracle 12.1.0.2.v5",
      value: "8",
    },
    {
      label: "Oracle 12.1.0.2.v4",
      value: "9",
    },
    {
      label: "Oracle 12.1.0.2.v3",
      value: "10",
    },
    {
      label: "Oracle 12.1.0.2.v2",
      value: "11",
    },
  ],
  microsoft: [
    {
      label: "SQL Server 2017 14.00.3015.40.v1",
      value: "1",
    },
    {
      label: "SQL Server 2017 14.00.1000.169.v1",
      value: "2",
    },
    {
      label: "SQL Server 2017 13.00.4466.4.v1",
      value: "3",
    },
    {
      label: "SQL Server 2017 13.00.4451.0.v1",
      value: "4",
    },
    {
      label: "SQL Server 2017 13.00.4422.0.v1",
      value: "5",
    },
    {
      label: "SQL Server 2017 13.00.2164.0.v1",
      value: "6",
    },
    {
      label: "SQL Server 2017 12.00.5546.0.v1",
      value: "7",
    },
  ],
}

export const ENGINE_EDITIONS = {
  aurora: [
    {
      value: "MySQL 5.6-compatible",
      label: "MySQL 5.6-compatible",
    },
    {
      value: "MySQL 5.7-compatible",
      label: "MySQL 5.7-compatible",
    },
    {
      value: "PostgreSQL-compatible",
      label: "PostgreSQL-compatible",
    },
  ],
  microsoft: [
    {
      value: "SQL Server Express Edition",
      label: "SQL Server Express Edition",
      description: "Affordable database management system that supports database sizes up to 10 GiB.",
    },
    {
      value: "SQL Server Web Edition",
      label: "SQL Server Web Edition",
      description:
        "In accordance with Microsoft's licensing policies, it can only be used to support public and Internet-accessible webpages, websites, web applications, and web services.",
    },
    {
      value: "SQL Server Standard Edition",
      label: "SQL Server Standard Edition",
      description:
        "Core data management and business intelligence capabilities for mission-critical applications and mixed workloads.",
    },
    {
      value: "SQL Server Enterprise Edition",
      label: "SQL Server Enterprise Edition",
      description:
        "Comprehensive high-end capabilities for mission-critical applications with demanding database workloads and business intelligence requirements.",
    },
  ],
}

export const ENGINE_USECASES = [
  {
    value: "Production",
    label: "Production",
    description:
      "Use Multi-AZ deployment and provisioned IOPS storage as defaults for high availability and fast, consistent performance.",
  },
  {
    value: "Dev/test",
    label: "Dev/test",
    description: "This instance is intended for use outside of production or under the RDS Free Usage Tier",
  },
]

export const ENGINE_DETAILS = {
  aurora: (
    <TextContent>
      <h3>Amazon Aurora</h3>
      <div>
        <Box variant='p' color='text-body-secondary'>
          Amazon Aurora is a MySQL- and PostgreSQL-compatible enterprise-class database, starting at &lt;$1/day.
        </Box>
        <ul>
          <li>Up to 5 times the throughput of MySQL and 3 times the throughput of PostgreSQL</li>
          <li>Up to 64TB of auto-scaling SSD storage</li>
          <li>6-way replication across three Availability Zones</li>
          <li className='custom-screenshot-hide'>Up to 15 Read Replicas with sub-10ms replica lag</li>
          <li className='custom-screenshot-hide'>Automatic monitoring and failover in less than 30 seconds</li>
        </ul>
      </div>
    </TextContent>
  ),
  mysql: (
    <TextContent>
      <h3>MySQL</h3>
      <Box variant='p' color='text-body-secondary'>
        MySQL is the most popular open source database in the world. MySQL on RDS offers the rich features of the MySQL
        community edition with the flexibility to easily scale compute resources or storage capacity for your database.
      </Box>
      <ul>
        <li>Supports database size up to 16 TB.</li>
        <li>Instances offer up to 32 vCPUs and 244 GiB Memory.</li>
        <li>Supports automated backup and point-in-time recovery.</li>
        <li>Supports cross-region read replicas.</li>
      </ul>
    </TextContent>
  ),
  maria: (
    <TextContent>
      <h3>MariaDB</h3>
      <Box variant='p' color='text-body-secondary'>
        MariaDB Community Edition is a MySQL-compatible database with strong support from the open source community, and
        extra features and performance optimizations.{" "}
      </Box>
      <ul>
        <li>Supports database size up to 16 TB.</li>
        <li>Instances offer up to 32 vCPUs and 244 GiB Memory.</li>
        <li>Supports automated backup and point-in-time recovery.</li>
        <li>Supports cross-region read replicas.</li>
        <li>Supports global transaction ID (GTID) and thread pooling.</li>
        <li>Developed and supported by the MariaDB open source community.</li>
      </ul>
    </TextContent>
  ),
  postgres: (
    <TextContent>
      <h3>PostgreSQL</h3>
      <Box variant='p' color='text-body-secondary'>
        PostgreSQL is a powerful, open-source object-relational database system with a strong reputation of reliability,
        stability, and correctness.
      </Box>
      <ul>
        <li>High reliability and stability in a variety of workloads.</li>
        <li>Advanced features to perform in high-volume environments.</li>
        <li>Vibrant open-source community that releases new features multiple times per year.</li>
        <li>Supports multiple extensions that add even more functionality to the database.</li>
        <li>The most Oracle-compatible open-source database.</li>
      </ul>
    </TextContent>
  ),
  oracle: (
    <TextContent>
      <h3>Oracle</h3>
      <Box variant='p' color='text-body-secondary'>
        Efficient, reliable, and secure database management system that delivers comprehensive high-end capabilities for
        mission-critical applications and demanding database workloads.
      </Box>
      <ul>
        <li>Deploy multiple editions of Oracle Database in minutes.</li>
        <li>Provides backup and recovery resources like automatic backups and DB snapshots.</li>
        <li>Use automatic host replacement in the event of a hardware failure.</li>
      </ul>
    </TextContent>
  ),
  microsoft: (
    <TextContent>
      <h3>Microsoft SQL Server</h3>
      <Box variant='p' color='text-body-secondary'>
        Amazon RDS for SQL Server is a managed service that is designed for developers who require the features and
        capabilities of SQL Server for building a new application.
      </Box>
      <ul>
        <li>
          Deploy multiple editions of SQL Server (2008 R2, 2012, 2014, 2016, and 2017) including Express, Web, Standard
          and Enterprise, in minutes.
        </li>
        <li>Provides backup and recovery resources like automatic backups and DB snapshots.</li>
        <li>
          You can now create Amazon RDS for SQL Server database instances with up to 16TB of storage, up from 4TB.
        </li>
      </ul>
    </TextContent>
  ),
}

export const LICENSES = {
  aurora: "Bring your own license",
  mysql: "General public license",
  maria: "General public license",
  postgres: "Postgresql license",
}

export const CLASS_OPTIONS = [
  {
    label: "Current generation burstable performance instance classes",
    options: [
      { value: "1", label: "db.t2.micro", tags: ["1 vCPU", "1 GiB RAM"], labelTag: "Free tier eligible" },
      { value: "2", label: "db.t2.small", tags: ["1 vCPU", "2 GiB RAM"] },
      { value: "3", label: "db.t2.medium", tags: ["2 vCPU", "4 GiB RAM"] },
    ],
  },
  {
    label: "Latest generation standard instance classes",
    options: [
      { value: "4", label: "db.m4.large", tags: ["2 vCPU", "8 GiB RAM"] },
      { value: "5", label: "db.m4.xlarge", tags: ["4 vCPU", "16 GiB RAM"] },
      { value: "6", label: "db.m4.2xlarge", tags: ["8 vCPU", "32 GiB RAM"] },
      { value: "7", label: "db.m4.4xlarge", tags: ["16 vCPU", "64 GiB RAM"] },
    ],
  },
  {
    label: "Current generation memory optimized instance classes",
    options: [
      { value: "8", label: "db.r4.large", tags: ["2 vCPU", "15.25 GiB RAM"] },
      { value: "9", label: "db.r4.xlarge", tags: ["4 vCPU", "30.5 GiB RAM"] },
      { value: "10", label: "db.r4.2xlarge", tags: ["8 vCPU", "61 GiB RAM"] },
    ],
  },
]

export const STORAGE_TYPES = [
  {
    value: "General Purpose (SSD)",
    label: "General Purpose (SSD)",
    description:
      "Suitable for a broad range of database workloads. Provides baseline of 3 IOPS/GiB and ability to burst to 3,000 IOPS.",
  },
  {
    value: "Provisioned IOPS (SSD)",
    label: "Provisioned IOPS (SSD)",
    description:
      "Suitable for I/O-intensive database workloads. Provides flexibility to provision I/O ranging from 1,000 to 20,000 IOPS.",
  },
  {
    value: "Magnetic",
    label: "Magnetic",
    description:
      "Suitable for backward compatibility. The maximum amount of storage allowed for DB instances on magnetic storage is less than that of the other storage types.",
  },
]

export const TIME_ZONES = [
  {
    label: "No preference",
    value: "1",
  },
  {
    label: "AUS Central Standard Time",
    value: "2",
  },
  {
    label: "AUS Eastern Standard Time",
    value: "3",
  },
  {
    label: "Afghanistan Standard Time",
    value: "4",
  },
  {
    label: "Alaskan Standard Time",
    value: "5",
  },
  {
    label: "Atlantic Standard Time",
    value: "6",
  },
  {
    label: "Belarus Standard Time",
    value: "7",
  },
  {
    label: "Cananda Central Standard Time",
    value: "8",
  },
  {
    label: "Cananda Eastern Standard Time",
    value: "9",
  },
]

export const AVAILABILITY_ZONES = [
  { value: "none", label: "No preference" },
  { value: "a", label: "us-east-1a" },
  { value: "c", label: "us-east-1c" },
  { value: "d", label: "us-east-1d" },
  { value: "e", label: "us-east-1e" },
]

export const VPC_OPTIONS = [
  {
    label: "vpc-28937451985",
    value: "1",
  },
  {
    label: "vpc-5375a085",
    value: "2",
  },
  {
    label: "vpc-0q94684390",
    value: "3",
  },
  {
    label: "vpc-928375h923",
    value: "4",
  },
  {
    label: "vpc-ad93nkdu3",
    value: "5",
  },
  {
    label: "vpc-bcld983bn29",
    value: "6",
  },
  {
    label: "vpc-910384753bjka",
    value: "7",
  },
  {
    label: "vpc-aq9j49n9wsoi2mp",
    value: "8",
  },
  {
    label: "vpc-kd290adg203hwe923",
    value: "9",
  },
]

export const SUBNET_OPTIONS = [
  {
    label: "default-vpc-28937451985",
    value: "1",
  },
  {
    label: "vpc-5375a085",
    value: "2",
  },
  {
    label: "vpc-0q94684390",
    value: "3",
  },
  {
    label: "vpc-928375h923",
    value: "4",
  },
]

export const SECURITY_GROUPS = [
  {
    label: "rds-launch-steps-1",
    value: "1",
  },
  {
    label: "rds-launch-steps-2",
    value: "2",
  },
  {
    label: "rds-launch-steps-3",
    value: "3",
  },
  {
    label: "rds-launch-steps-4",
    value: "4",
  },
  {
    label: "rds-launch-steps-5",
    value: "5",
  },
  {
    label: "rds-launch-steps-6",
    value: "6",
  },
  {
    label: "rds-launch-steps-7",
    value: "7",
  },
  {
    label: "rds-launch-steps-8",
    value: "8",
  },
  {
    label: "rds-launch-steps-9",
    value: "9",
  },
]

export const FAILOVER_PRIORITIES = [
  { value: "none", label: "No preference" },
  { value: "0", label: "tier-0" },
  { value: "1", label: "tier-1" },
  { value: "2", label: "tier-2" },
  { value: "3", label: "tier-3" },
]

export const BACKUP_PERIODS = [
  { value: "none", label: "Turn off automatic backups" },
  { value: "1", label: "1 day" },
  { value: "2", label: "2 days" },
  { value: "3", label: "3 days" },
  { value: "4", label: "4 days" },
  { value: "5", label: "5 days" },
]

export const DEFAULT_STEP_INFO = {
  engine: {
    engineOption: ENGINES[0].value,
    version: ENGINE_VERSIONS[ENGINES[1].value][0],
    edition: ENGINE_EDITIONS[ENGINES[0].value][0].value,
    usecase: ENGINE_USECASES[0].value,
  },
  uploadPdf: {
    pdf: null,
    pdfName: "",
  },
  details: {
    instanceClass: CLASS_OPTIONS[0].options[0],
    storageType: STORAGE_TYPES[0].value,
    storage: "20",
    timeZone: TIME_ZONES[0],
    availabilityZone: AVAILABILITY_ZONES[0],
    port: "3306",
    iamAuth: "off",
    identifier: "",
    username: "",
    password: "",
    confirmPassword: "",
  },
  advanced: {
    vpc: VPC_OPTIONS[0],
    subnet: SUBNET_OPTIONS[0],
    securityGroups: SECURITY_GROUPS[0],
    accessibility: "on",
    encryption: "off",
    upgrades: "off",
    backup: BACKUP_PERIODS[0],
    monitoring: "off",
    failover: FAILOVER_PRIORITIES[0],
    backtrack: "on",
  },
}

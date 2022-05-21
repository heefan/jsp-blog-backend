-- MySQL dump 10.13  Distrib 5.7.34, for osx10.16 (x86_64)
--
-- Host: 127.0.0.1    Database: blog
-- ------------------------------------------------------
-- Server version	5.7.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `article`
--

DROP TABLE IF EXISTS `article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `article` (
  `id` int(11) NOT NULL,
  `typeId` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` text,
  `brief` text,
  `viewCount` int(11) DEFAULT NULL,
  `lastUpdated` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article`
--

LOCK TABLES `article` WRITE;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` VALUES (1,1,'Virtual Memory 初步理解',' > __开发环境__ > >  > >     > **引例** > > 动态分配一个字符串“hello world\"，在虚拟内存中找出这个字符串的地址。  >  > > **学习目的：** > > 1. 找到_heap_中`hello world`的地址 > 2. 将改地址的内容从`hello world`改写成其他字符串。     ### 引例程序    ```c #include <stdlib.h> #include <stdio.h> #include <unistd.h> #include <string.h>  int main() { 	char *s = strdup(\"hello world\"); 	unsigned long int count = 0;  	if(!s) { 		fprintf(stderr, \"Can\'t allocate memory\"); 		return EXIT_FAILURE; 	}  	while(s) { 		printf(\"[%lu] %s (%p)\\n\", count, s, (void*)s); 		sleep(1); 		count++; 	}  	return EXIT_SUCCESS; } ```        ## 改写heap内存地址    希望有个  ```shell $ sudo ./read_write_heap.py 4618 Holberton \"Fun w vm!\" [*] maps: /proc/4618/maps [*] mem: /proc/4618/mem [*] Found [heap]:     pathname = [heap]     addresses = 010ff000-01120000     permisions = rw-p     offset = 00000000     inode = 0     Addr start [10ff000] | end [1120000] [*] Found \'Holberton\' at 10 [*] Writing \'Fun w vm!\' at 10ff010 ```        ## 知识记忆点  1. 内存布局图     ![virtual memory](https://s3-us-west-1.amazonaws.com/holbertonschool/medias/virtual_memory.png)    2. 64位系统，地址表达`0xffff ffff ffff ffff `。     >f =  4 bits    >    >2f = 8 bits = 1 byte    >    >4f * 4组 = 4 * 4bit * 4 = 64bits      ### Reference:   [Hack The Virtual Memory: C strings & /proc](https://blog.holbertonschool.com/hack-the-virtual-memory-c-strings-proc/)   * *Posted on [March 20, 2017](https://blog.holbertonschool.com/hack-the-virtual-memory-c-strings-proc/)* *by [Julien Barbier](https://blog.holbertonschool.com/author/julienholbertonschool-com/)*  Unix & Linux: How do I read from /proc/$pid/mem under Linux? (4 Solutions!!) https://www.youtube.com/watch?v=YO9iSkYsS7s  vmmap.py https://gist.github.com/fxthomas/3c915909bbf84bc14782cb6adef0f915  /proc/<pid>/maps简要分析 https://www.cnblogs.com/arnoldlu/p/10272466.html  Hack The Virtual Memory: C strings & /proc https://blog.holbertonschool.com/hack-the-virtual-memory-c-strings-proc/   ','* 虚拟内存对App Developer有什么意义？\n* `Page Fault`是怎么回事 \n* `gdb`初步调试',100,1628929310);
/*!40000 ALTER TABLE `article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type`
--

DROP TABLE IF EXISTS `type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `typeName` varchar(45) DEFAULT NULL,
  `orderNum` int(11) DEFAULT NULL,
  `icon` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type`
--

LOCK TABLES `type` WRITE;
/*!40000 ALTER TABLE `type` DISABLE KEYS */;
INSERT INTO `type` VALUES (1,'经典课程',1,'YoutubeOutlined'),(2,'程序开发',2,'MessageOutlined'),(3,'关于',3,'SmileOutlined');
/*!40000 ALTER TABLE `type` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-08-14 16:27:42

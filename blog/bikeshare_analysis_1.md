---
title: "Cyclistic bike share analysis"
author: "Kirui Ian Mark"
hero: "/images/hero-cyclistic.jpg"
desc: " The city of Long Beach, California has a bike share system in place which has been in operation since 2012. The system consists of two main components, a central station and a network of docking stations. The central station houses the bikes and the docking stations are located throughout the city. The system is operated by the city’s Department of Parks, Recreation, and Marine. The city’s bike share system is available to residents and visitors alike. The system is used primarily for recreation and transportation. The city’s bike share system has been successful in reducing traffic congestion and pollution, and promoting physical activity. The city’s bike share system has also been shown to be cost effective, with an estimated cost savings of $3.7 million over the course of the first five years of operation."
date: "2021-10-10"
output:
  slidy_presentation: default
  ioslides_presentation: default
---

# ASK

### Business task:

How do annual members and casual riders use Cyclistic bikes
differently?
![Sign-in](/images/cyclistic.jpg)

## Problem Statement

Cyclistic is faced with an uncertain future and is no longer able to solely rely on their traditional marketing strategies of raising general awareness and appealing to a variety of needs with flexible price points and diverse product choices. In the interest of company growth, the director of marketing believes that Cyclistic should capitalize on the lucrative profit margins of annual subscribers by marketing to existing casual customers and persuading them to become yearly subscribers. If that strategy is plausible, a successfully executed marketing campaign would result in more sustainable long-term revenue. To that end, we need to analyze how and why Cyclistic casual bikers and members differ to weigh any evidence, opportunities and barriers to any future conversion strategy.

# Prepare: collecting data and checking its constraints

### location of data:

The data we'll be using was extracted from here with a helper dataset downloaded from here and is made available by Motivate International Inc. under this license. Note that Cyclistic is a fictional entity and Divvy's open data is used for the purpose of this case study.

The data available to us consists of a repository made up of quantitative measurements collected over time. Each data point represents a single bike trip from one docking station to the next. On first glance, this data does not seem sufficient to fully comprehend how casuals and members use Cyclistic bikes differently. This data provides an overhead view of what they may be doing differently, but not the why. At this stage I would recommend putting the project on hold to collect more pertinent data. In particular, it would be useful to survey members and casuals on the ground to get answers to essential qualitative questions like "What do you use Cyclistic bikes for?" and "What discourages you from using Cyclistic bikes?".

Assuming that executives are unwilling to commit additional resources and time to collect more data, we will do our best with the data currently on hand.

We'll be examining a period of 12 months, from the start of July 2020 to the end of June 2021. Each month has a separate comma separated value file with the same headings. Each record consists of a bike trip under the bike-sharing program composed of several features: a unique hash ID serving as the tables primary keys to identify each bike trip, the type of bike used, the type of customer (casual or member), details about the starting and ending docking station (name, ID, latitude and longitude) and the datetime for when the bike was picked up and dropped off.

### Data quality assessment:

Reliable: ⚠️

Reliability issues Description
Validity Minimal constraints were imposed on formatting and range, resulting in issues like end datetimes starting before
start datetimes, stations having multiple IDs, IDs belonging to multiple stations, and formatting changes over time
Incomplete 10% of records have one or more missing values
Duplicates There are hundreds of duplicate primary keys, but each record is unique
Original: ✅

The data is sourced by a first-party group (Motivate International Inc.) using their own resources without any third-party intervention

Comprehensiveness: ✅

This data set is comprehensive enough for our inquiry, and is mostly free of human error

Current: ✅

The time frame we're examining gives us an up to date view

Vetted: ✅

On initial investigation, most records are free of errors and represent factual bike trips in Chicago

### purpose of the data uploaded

This dataset will assist in finding trends and insights that outlines how Cyclistic bikes are being used by different user types

### Assumptions

It is assumed that the data collection process was accomplished with integrity. The accuracy, bias, and credibility is sufficiently vetted by the first-hand source of the data. The original repository has never been accessed or modified in any unauthorized manner.

### Tools of choice

The tools of choice was R-Studio.
It has faster and easier manipulation of data as compared to spreadsheets for the case of this dataset which is quite big .

# Processing data for analysis

## Setting up my environment

Notes: setting up my R environment by loading relevant packages used for cleaning data,
analyzing and visualization

```{r loading packages, echo=FALSE, warning=FALSE}
library(tidyverse)
library(lubridate)
library(ggplot2)
library(dplyr)
library(janitor)
library(tidyr)
```

collecting and uploading data for cleaning and analysis

```{r collecting and uploading data, echo=FALSE}
getwd()
setwd( "C:/Users/hp/Desktop/Extracted_2021_jan_to_april")

oct_2020 <- read_csv("202010-divvy-tripdata.csv")
nov_2020 <- read_csv("202011-divvy-tripdata.csv")
dec_2020 <- read_csv("202012-divvy-tripdata.csv")
jan_2021 <- read_csv("202101-divvy-tripdata.csv")
feb_2021 <- read_csv("202102-divvy-tripdata.csv")
mar_2021 <- read_csv("202103-divvy-tripdata.csv")
apr_2021 <- read_csv("202104-divvy-tripdata.csv")
may_2021 <- read_csv("202105-divvy-tripdata.csv")
jun_2021 <- read_csv("202106-divvy-tripdata.csv")
jul_2021 <- read_csv("202107-divvy-tripdata.csv")
aug_2021 <- read_csv("202108-divvy-tripdata.csv")
sep_2021 <- read_csv("202109-divvy-tripdata.csv")
```

Notes: checking the column names of data uploaded

```{r checking column names, echo=FALSE}
colnames(oct_2020)
colnames(nov_2020)
colnames(dec_2020)
colnames(jan_2021)
colnames(feb_2021)
colnames(mar_2021)
colnames(apr_2021)
colnames(may_2021)
colnames(jun_2021)
colnames(jul_2021)
colnames(aug_2021)
colnames(sep_2021)
```

Notes: since we are investigating how different riders use the cylcistic bikes differently
it will require to make some calculation in time, so the need to change the default datatype of the started_at and ended_at columns

```{r changing the date formats for columns, include=FALSE}
oct_2020$started_at <- as.POSIXct(oct_2020$started_at, format = "%m-%d-%y %H:%M")
oct_2020$ended_at <- as.POSIXct(oct_2020$ended_at, format = "%m-%d-%y %H:%M")

nov_2020$started_at <- as.POSIXct(nov_2020$started_at, format = "%m-%d-%y %H:%M")
nov_2020$ended_at <- as.POSIXct(nov_2020$ended_at, format = "%m-%d-%y %H:%M")

dec_2020$started_at <- as.POSIXct(dec_2020$started_at, format = "%m-%d-%y %H:%M")
dec_2020$ended_at <- as.POSIXct(dec_2020$ended_at, format = "%m-%d-%y %H:%M")

jan_2021$started_at <- as.POSIXct(jan_2021$started_at, format = "%m-%d-%y %H:%M")
jan_2021$ended_at <- as.POSIXct(jan_2021$ended_at, format = "%m-%d-%y %H:%M")

feb_2021$started_at <- as.POSIXct(feb_2021$started_at, format = "%m-%d-%y %H:%M")
feb_2021$ended_at <- as.POSIXct(feb_2021$ended_at, format = "%m-%d-%y %H:%M")

mar_2021$started_at <- as.POSIXct(mar_2021$started_at, format = "%m-%d-%y %H:%M")
mar_2021$ended_at <- as.POSIXct(mar_2021$ended_at, format = "%m-%d-%y %H:%M")

apr_2021$started_at <- as.POSIXct(apr_2021$started_at, format = "%m-%d-%y %H:%M")
apr_2021$ended_at <- as.POSIXct(apr_2021$ended_at, format = "%m-%d-%y %H:%M")

may_2021$started_at <- as.POSIXct(may_2021$started_at, format = "%m-%d-%y %H:%M")
may_2021$ended_at <- as.POSIXct(may_2021$ended_at, format = "%m-%d-%y %H:%M")

jun_2021$started_at <- as.POSIXct(jun_2021$started_at, format = "%m-%d-%y %H:%M")
jun_2021$ended_at <- as.POSIXct(jun_2021$ended_at, format = "%m-%d-%y %H:%M")

jul_2021$started_at <- as.POSIXct(jul_2021$started_at, format = "%m-%d-%y %H:%M")
jul_2021$ended_at <- as.POSIXct(jul_2021$ended_at, format = "%m-%d-%y %H:%M")

aug_2021$started_at <- as.POSIXct(aug_2021$started_at, format = "%m-%d-%y %H:%M")
aug_2021$ended_at <- as.POSIXct(aug_2021$ended_at, format = "%m-%d-%y %H:%M")

sep_2021$started_at <- as.POSIXct(sep_2021$started_at, format = "%m-%d-%y %H:%M")
sep_2021$ended_at <- as.POSIXct(sep_2021$ended_at, format = "%m-%d-%y %H:%M")
```

Notes: combining the dataset into one single csv file and assigning it to a dataframe

```{r combining dataset into a dataframe}
bike_df <- rbind(oct_2020,nov_2020,dec_2020,jan_2021,feb_2021,
                 mar_2021,apr_2021,may_2021,jun_2021,jul_2021,aug_2021,
                 sep_2021)
```

Notes: a look at the dataframe

```{r}
glimpse(bike_df)
```

checking for any null/NA values and omitting them

```{r}
bike_df_1 <- bike_df[complete.cases(bike_df), ]

bike_df_1  <- na.omit(bike_df)
```

```{r}
str(bike_df_1)

```

renaming columns

```{r}
bike_df_1 <- bike_df_1 %>% rename(trip_id = ride_id, ride_type = rideable_type, start_time = started_at, end_time= ended_at)
glimpse(bike_df)
```

removing columns that are out of our scope

```{r}
bike_df_1 <- subset(bike_df_1, select = -c(start_lat:end_lng))
glimpse(bike_df_1)

bike_df_1 <- bike_df_1%>% distinct()

str(bike_df_1)
```

prior calculations that are necessary for analysis phase

```{r Calculating ride length in minutes and create a new column }
bike_df_1$ride_length <- as.double(bike_df_1$end_time- bike_df_1$start_time)/60
str(bike_df_1)
summary(bike_df_1$ride_length)
```

```{r Creating new columns(day_of_week, month, time)}
bike_df_1$day_of_week <- weekdays(bike_df_1$start_time)
bike_df_1$month <- months(bike_df_1$start_time)
bike_df_1$time <- hour(bike_df_1$start_time)
str(bike_df_1)

```

```{r Eliminating entries with ride length less than 0}
bike_df_1 <- subset(bike_df_1, -ride_length<0)
str(bike_df_1)
```

# Analysis

### the following calculation are made to facilitate analysis and solve the problem statement

1. total ride_length by group

```{r total ride_length by group, echo=FALSE}
bike_df_1 %>% group_by (member_casual) %>% summarize(total_time = sum(ride_length))
summary(bike_df_1$ride_length)
```

2. summary of ride length for each group

```{r summary of ride length for each group, echo=FALSE}
bike_df_1 %>%
  group_by(member_casual) %>%
  summarize(min_ride_length = min(ride_length), max_ride_length = max(ride_length),
            mean_ride_length = mean(ride_length), median_ride_length = median(ride_length))
```

3. no of rides in each day of the week

```{r no. of rides in each day of the week, echo=FALSE}
bike_df_1 %>% group_by(member_casual, day_of_week) %>% summarize(num_of_rides = n())
```

4. no of rides per month and no of rides per ride type for each group

```{r no of rides per month and no of rides per ride type for each group}
bike_df_1 %>%  group_by(member_casual, month) %>%  summarize(num_of_rides= n())
bike_df_1 %>%  group_by(member_casual, ride_type) %>% summarize(num_of_rides = n())
```

# Visualizations

```{r Total Rides Vs. Day of the week, include=FALSE}
options(scipen = 999)
bike_df_1 %>%
  group_by(member_casual, day_of_week) %>%
  summarize(num_of_rides = n()) %>%
  arrange(day_of_week) %>%
  ggplot(aes(x = day_of_week, y = num_of_rides, fill = member_casual))+
  geom_col(position = "dodge", width = 0.5)+
  labs(title ="Total rides Vs. Day of the week")+
  scale_y_continuous()
```

The graph shows that the causal riders using the service more on saturdays and sundays,
while for the rest of the week the demand is pretty average. On the other hand, the demand from the members is quite the same throughout the week and more than casual riders in the weekdays.

```{r Total rides Vs. month, echo=FALSE}
bike_df_1 %>%
  group_by(member_casual, month) %>%
  summarize(num_of_rides = n()) %>%
  arrange(desc(num_of_rides)) %>%
  ggplot(aes(x = month, y = num_of_rides, fill = member_casual))+
  theme(axis.text.x = element_text(angle = 45))+
  geom_col(position = "dodge", width = 0.5)+
  labs(title ="Total rides Vs. month") +
  scale_y_continuous()
```

From the visual we can understand that the demand was at peak from both causual and
membership riders in the months of June and July, and it was low from December to March.
Also per month we can see that membership riders take more rides than casual riders
throughout the year.

```{r Average number of rides Vs. day of week, echo=FALSE}
bike_df_1 %>%
  group_by(member_casual, day_of_week) %>%
  summarize(avg_ride_length = mean(ride_length)) %>%
  ggplot(aes(x = day_of_week, y = avg_ride_length, fill = member_casual))+
  theme(axis.text.x = element_text(angle = 45))+
  geom_col(position = "dodge", width = 0.5)+
  labs(title ="Average number of rides Vs. day of week")+
  scale_y_continuous()
```

Throughout the week average ride length of casual riders is more than that of a
member.On weekends the average ride length was the maximum from both the member
types compared to weekdays.

```{r Average number of rides Vs. month, echo=FALSE}
bike_df_1 %>%
  group_by(member_casual, month) %>%
  summarize(avg_ride_length = mean(ride_length)) %>%
  ggplot(aes(x = month, y = avg_ride_length, fill = member_casual))+
  theme(axis.text.x = element_text(angle = 45))+
  geom_col(position = "dodge", width = 0.5)+
  labs(title ="Average number of rides Vs. month")+
  scale_y_continuous()
```

The average ride length by casual riders was more than membership riders throughout
the year. It's more than 30 minutes for most of the months by casual riders(except the months of august,december and september) and maximum in February accounting to 50 minutes. While membership riders average ride length never crossed 20 minutes.

```{r Ride_type Vs Number of rides}
bike_df_1 %>%
  group_by(ride_type, member_casual) %>%
  summarize(num_of_rides = n()) %>%
  ggplot(aes(x = ride_type, y = num_of_rides, fill= member_casual))+
  theme(axis.text.x = element_text(angle = 45))+
  geom_col(position = "dodge", width = 0.5)+
  labs(title ="Ride_type Vs Number of rides")+
  scale_y_continuous()

```

Casual riders use classical bikes more followed by electric bikes. While membership
riders use classic bikes more while the demand was pretty much same for both electric
and docked bikes.

```{r Number of rides throughout the day}
bike_df_1 %>% group_by(member_casual, time) %>%
 summarize(num_of_rides = n()) %>%
 ggplot(aes(x= time, y = num_of_rides, color = member_casual))+
geom_line() + labs(title = "Number of rides throughout the day")
scale_x_continuous()
```

The peak demand from both the types of riders was from 5 PM to 7 PM and the lowest
was during the morning hours 2 AM to 4 AM. We can also see the seocnd peak from
membership riders 7 AM to 9 AM.

## Takeaways:

$ The average ride length by casual riders is almost twice to that of membership riders throughout the day and months of the year.

$ Casual riders use the service more during weekends, while the demand from membership riders was same for the entire week.

$ Both casual and membership riders prefer the classical bikes.

## Recommendations:

$ Provide attractive packages during the weekdays to attract more casual riders, as their demand is very low in weekdays.

$ Neeed to provide memberships with some discount to ensure more casual riders take up the member

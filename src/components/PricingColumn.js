// @flow
import React, { useState } from 'react'
import Box from 'ui-box'
import Switch from 'rc-switch'

import Button from 'primitives/Button'
import Column from 'primitives/Column'
import Emphasis from 'primitives/Emphasis'
import Heading from 'primitives/Heading'
import Icon from 'primitives/Icon'
import Flex from 'primitives/Flex'
import ListItem from 'primitives/ListItem'
import Paragraph from 'primitives/Paragraph'
import Strong from 'primitives/Strong'
import UnorderedList from 'primitives/UnorderedList'

import { dollarsFromCents } from 'utils/money'

export default function PricingColumn({ product, hasMounted }) {
  const [isMonthly, setMonthly] = useState(false)

  const { metadata } = product

  const togglePlan = () => {
    setMonthly(!isMonthly)
  }

  return (
    <Column
      background={metadata.recommended ? 'linear-gradient(#fcfcd4, #fefdb3)' : 'linear-gradient(#eefcfd, #e6f4f1)'}
      border={metadata.recommended ? '3px solid #fefdb3' : '3px solid #e6f4f1'}
      borderRadius={16}
      // boxShadow="0 0 1px 0 rgba(67, 90, 111, 0.3), 0 2px 4px -2px rgba(67, 90, 111, 0.47)"
      marginX={metadata.recommended ? 24 : 0}
      marginY={12}
      position="relative"
      transition="transform 1.5s ease"
      transform={hasMounted ? `translateY(0px)` : `translateY(${metadata.recommended ? 240 : 200}px)`}
    >
      {metadata.recommended && (
        <Flex justifyContent="center">
          <Heading h={6} size={200} opacity={0.5} position="absolute" top={-72}>
            <Icon icon="fas fa-magic" marginRight={8} /> most popular
          </Heading>
        </Flex>
      )}
      <Heading h={2} color="#103c52" marginTop={16} size={300} textAlign="center">
        {product.name}
      </Heading>
      <Box paddingX={32}>
        {product.plans[0].amount === 0 && (
          <Heading h={2} marginTop={0} size={200} textAlign="center">
            For public repositories only
          </Heading>
        )}
        {product.plans.length > 1 && (
          <Box>
            <Flex justifyContent="center" marginBottom={24}>
              <Heading h={2} margin={0} size={500}>
                {isMonthly ? dollarsFromCents(product.plans[0].amount / 12) : dollarsFromCents(product.plans[1].amount)}
              </Heading>
              <Box marginLeft={8}>
                <Paragraph marginBottom={0} position="relative" top={8}>
                  <Emphasis opacity={0.5}>per user</Emphasis>
                </Paragraph>
                <Paragraph marginBottom={0}>
                  <Emphasis opacity={0.5}>per month</Emphasis>
                </Paragraph>
              </Box>
            </Flex>
            <Flex alignItems="center" justifyContent="center">
              <Strong
                cursor="pointer"
                onClick={() => setMonthly(false)}
                opacity={isMonthly ? 0.4 : 1}
                transition="opacity 0.3s ease"
              >
                Monthly
              </Strong>
              <Switch checked={isMonthly} onChange={togglePlan} />
              <Strong
                cursor="pointer"
                onClick={() => setMonthly(true)}
                opacity={isMonthly ? 1 : 0.4}
                transition="opacity 0.3s ease"
              >
                Annually
              </Strong>
            </Flex>
          </Box>
        )}
        {product.plans[0].amount >= 5000000 && (
          <Heading h={2} marginTop={0} size={200} textAlign="center">
            For security-focused companies
          </Heading>
        )}
        <UnorderedList marginTop={product.plans.length > 1 ? 40 : 84} marginBottom={40}>
          {metadata.perks.split('\n').map(metadata => (
            <ListItem key={metadata} fontSize={17} marginBottom={16}>
              <Icon icon="fas fa-check" color="#5abf7e" marginRight={8} /> {metadata}
            </ListItem>
          ))}
        </UnorderedList>
        <Flex alignItems="center" height={100} justifyContent="center">
          <Button href="https://airtable.com/shrUZixSNBqSzmdTc" target="_blank">
            {metadata.cta}
          </Button>
        </Flex>
        {product.plans[0].trial_period_days && (
          <Paragraph opacity={0.5} textAlign="center">
            <Emphasis>Comes with a {product.plans[0].trial_period_days}-day free trial</Emphasis>
          </Paragraph>
        )}
      </Box>
    </Column>
  )
}
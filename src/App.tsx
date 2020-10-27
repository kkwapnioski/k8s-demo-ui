import './App.scss';

import { Image, ImageFit, Stack, Text } from '@fluentui/react';

import React from 'react';

const dummyReplicaMap = new Map<string, Replica>([
    [
        'replica1',
        {
            name: 'replica1',
            lastSeenOnDateTime: new Date(),
            color: 'red',
            version: '1',
        },
    ],
    [
        'replica2',
        {
            name: 'replica2',
            lastSeenOnDateTime: new Date(),
            color: 'green',
            version: '1',
        },
    ],
    [
        'replica3',
        {
            name: 'replica3',
            lastSeenOnDateTime: new Date(),
            color: 'blue',
            version: '1',
        },
    ],
]);

function App() {
    const [replicaMap, setReplicaMap] = React.useState(dummyReplicaMap);

    const [currentReplica, setCurrentReplica] = React.useState<string>(
        'replica1'
    );

    const [requestCount, setRequestCount] = React.useState(0);
    const [successCount, setSuccessCount] = React.useState(0);
    const [failCount, setFailCount] = React.useState(0);

    return (
        <React.Fragment>
            <Stack>
                <Stack.Item>
                    <Text>k8s-moo-demo</Text>
                </Stack.Item>
                <Stack.Item>Number of Replicas: {replicaMap.size}</Stack.Item>
                <Stack.Item>Current Replica Name: {currentReplica}</Stack.Item>
                <Stack.Item>Request Count: {requestCount}</Stack.Item>
                <Stack.Item>Success Count: {successCount}</Stack.Item>
                <Stack.Item>Fail Count: {failCount}</Stack.Item>
            </Stack>
            <Stack className='wrapper' horizontal>
                {Array.from(replicaMap).map(([name, value]) => (
                    <ReplicaCard
                        key={name}
                        replica={value}
                        isActive={name === currentReplica}
                    />
                ))}
            </Stack>
        </React.Fragment>
    );
}

export default App;

interface ReplicaCardProps {
    replica: Replica;
    isActive: boolean;
}

const ReplicaCard = ({ replica, isActive }: ReplicaCardProps) => (
    <React.Fragment>
        <div
            className='card'
            style={{
                color: replica.color,
                borderColor: replica.color,
                backgroundColor: isActive ? 'lightgray' : 'transparent',
            }}
        >
            <Image
                width={150}
                height={150}
                imageFit={ImageFit.contain}
                src='http://clipart-library.com/img/1823862.png'
            />
            <Text>{replica.name}</Text>
        </div>
    </React.Fragment>
);

interface Replica {
    name: string;
    lastSeenOnDateTime: Date;
    color: string;
    version: string;
}

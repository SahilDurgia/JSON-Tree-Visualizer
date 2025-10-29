import { type FlowNode } from '../types';

export const parseJsonPath = (pathString: string): string[] => {
  if (!pathString || pathString === '$') {
    return [];
  }

  // Remove leading '$' if present, and handle '$.' prefix directly
  let cleanedPath = pathString.startsWith('$.') ? pathString.substring(2) : pathString.startsWith('$') ? pathString.substring(1) : pathString;

  const pathSegments: string[] = [];
  // Regex to match:
  // 1. .key (e.g., .user)
  // 2. [index] (e.g., [0])
  // 3. ['key'] (e.g., ['user name'])
  // 4. ["key"] (e.g., ["user name"])
  const regex = new RegExp("\\.([a-zA-Z0-9_]+)|\[(\\d+)\]|\[\'([^\\\']+)\'\]|\[\\\"([^\\\"]+)\\\"\]", "g");
  let match;

  let lastIndex = 0;
  while ((match = regex.exec(cleanedPath)) !== null) {
    if (match.index > lastIndex) {
      // Handle dot notation segments that are not part of bracket notation
      const dotNotationSegment = cleanedPath.substring(lastIndex, match.index);
      dotNotationSegment.split('.').forEach(segment => {
        if (segment) pathSegments.push(segment);
      });
    }

    if (match[1]) { // .key
      pathSegments.push(match[1]);
    } else if (match[2]) { // [index]
      pathSegments.push(match[2]);
    } else if (match[3]) { // ['key']
      pathSegments.push(match[3]);
    } else if (match[4]) { // ["key"]
      pathSegments.push(match[4]);
    }
    lastIndex = regex.lastIndex;
  }

  if (cleanedPath.length > lastIndex) {
    // Handle any remaining dot notation segment
    const remainingSegment = cleanedPath.substring(lastIndex);
    remainingSegment.split('.').forEach(segment => {
      if (segment) pathSegments.push(segment);
    });
  }

  return pathSegments;
};

// Function to reconstruct a normalized JSON path for comparison
const reconstructNormalizedPath = (pathArray: string[]): string => {
  if (pathArray.length === 0) {
    return '$';
  }

  let path = '$';
  pathArray.forEach(segment => {
    if (/^\d+$/.test(segment)) { // If it's a numeric index
      path += `[${segment}]`;
    } else if (segment.includes('.') || segment.includes(' ') || segment.includes('-')) { // If it contains special characters or spaces
      path += `['${segment}']`; // Use bracket notation with quotes
    } else {
      path += `.${segment}`;
    }
  });
  return path;
};

export const findNodeByPath = (nodes: FlowNode[], pathString: string): FlowNode | undefined => {
  const pathSegments = parseJsonPath(pathString);
  const normalizedPath = reconstructNormalizedPath(pathSegments);
  return nodes.find(node => node.data.path === normalizedPath);
};
